/*!
 * © 2019 Atypon Systems LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BibliographyItem } from '@manuscripts/json-schema'
import { CitationNode, schema } from '@manuscripts/transform'

import { buildCitations } from '../citation-builder'
import { CitationProvider } from '../CitationProvider'
import defaultLocal from '../defaultLocale'
import { bibliographyItemModels, citationModels } from './citation-data'
import { cslStyles } from './csl-styles'

const list: BibliographyItem[] = [
  {
    DOI: 'https://doi.org/10.1111/mec.13428',
    _id: 'MPBibliographyItem:880D5DEC-153C-43F0-8E8E-2014F56EFBA5',
    page: '929-942',
    type: 'article-journal',
    issue: '4',
    title:
      'Next-generation monitoring of aquatic biodiversity using environmental DNA metabarcoding.',
    author: [
      {
        _id: 'MPBibliographicName:B2F4E724-5F73-488D-A473-34A8E2F14804',
        given: 'A.',
        family: 'Valentini',
        objectType: 'MPBibliographicName',
      },
    ],
    issued: {
      _id: 'MPBibliographicDate:78BB1D14-76A9-491F-84F8-208E1EAC6952',
      'date-parts': [['2016']],
      objectType: 'MPBibliographicDate',
    },
    volume: '25',
    createdAt: 1693219430,
    updatedAt: 1693219430,
    objectType: 'MPBibliographyItem',
    containerID: 'MPProject:61184309-015d-4d42-9872-9371f3506df7',
    manuscriptID: 'MPManuscript:D80E4AE6-83B5-4E11-A4D4-F7E7D5D6E4A1',
    'container-title': 'Molecular Ecology',
  },
  {
    DOI: 'https://doi.org/10.1007/s10201-020-00634-y',
    _id: 'MPBibliographyItem:633384FA-9ECF-434B-AD56-B00A8464BE9B',
    type: 'article-journal',
    title:
      'Field storage of water samples affects measured environmental DNA concentration and detection.',
    author: [
      {
        _id: 'MPBibliographicName:6521B510-A83B-44B7-8923-40F09B882800',
        given: 'A. N.',
        family: 'Curtis',
        objectType: 'MPBibliographicName',
      },
      {
        _id: 'MPBibliographicName:ADBCCDEB-AF1D-4049-96E8-CCD6C019D07F',
        given: 'E. R.',
        family: 'Larson',
        objectType: 'MPBibliographicName',
      },
      {
        _id: 'MPBibliographicName:125DC6BE-B723-4DFC-85DD-DCCE46EFF5E8',
        given: 'M. A.',
        family: 'Davis',
        objectType: 'MPBibliographicName',
      },
    ],
    issued: {
      _id: 'MPBibliographicDate:F67BC728-2BFE-44FF-9084-63031DD012C5',
      'date-parts': [['2020']],
      objectType: 'MPBibliographicDate',
    },
    createdAt: 1693219430,
    updatedAt: 1693219430,
    objectType: 'MPBibliographyItem',
    containerID: 'MPProject:61184309-015d-4d42-9872-9371f3506df7',
    manuscriptID: 'MPManuscript:D80E4AE6-83B5-4E11-A4D4-F7E7D5D6E4A1',
    'container-title': 'Limnology',
  },
]

const new_item: BibliographyItem = {
  DOI: '10.1016/s0738-3991(02)00202-1',
  _id: 'MPBibliographyItem:910D1197-9E3E-44ED-A7D3-F79E2B073FE6',
  ISSN: '0738-3991',
  page: '295-296',
  type: 'article-journal',
  issue: '3',
  title: 'Each to each an introduction of each board members',
  issued: {
    _id: 'MPBibliographicDate:3F4EEF2B-A2E8-430C-A84C-3B577C36FC7B',
    'date-parts': [[2002, 12]],
    objectType: 'MPBibliographicDate',
  },
  source: 'Crossref',
  volume: '48',
  language: 'en',
  createdAt: 1693153938,
  publisher: 'Elsevier BV',
  updatedAt: 1693153938,
  objectType: 'MPBibliographyItem',
  containerID: 'MPProject:6c0c039d-6963-4212-b9db-e045aafbaabb',
  manuscriptID: 'MPManuscript:69CFC536-435D-4D3F-A3FD-D6482C3548BA',
  'original-title': '',
  'container-title': 'Patient Education and Counseling',
  'container-title-short': 'Patient Education and Counseling',
}

describe('CitationProvider', () => {
  test('generates bibliography', async () => {
    const getLibraryItem = (id: string) =>
      bibliographyItemModels.filter((i) => i._id === id)[0]

    for (const [cslIdentifier, cslStyle] of Object.entries(cslStyles)) {
      const citationProvider = new CitationProvider({
        locale: defaultLocal,
        citationStyle: cslStyle,
        getLibraryItem,
      })

      const dummyNode = schema.nodes.citation.create() as CitationNode

      const citations = buildCitations(
        citationModels.map((m) => [dummyNode, -1, m]),
        getLibraryItem
      )

      const generatedCitations =
        citationProvider.rebuildProcessorState(citations)

      expect(generatedCitations).toMatchSnapshot(`citations-${cslIdentifier}`)

      for (const generatedCitation of generatedCitations) {
        const [, , content] = generatedCitation
        expect(content).not.toBe('[NO_PRINTED_FORM]')
      }

      const [bibmeta, generatedBibliographyItems] =
        citationProvider.makeBibliography()

      expect(bibmeta.bibliography_errors).toHaveLength(0)

      expect(generatedBibliographyItems).toMatchSnapshot(
        `bibliography-items-${cslIdentifier}`
      )
    }
  })

  test('using CitationProvider', async () => {
    const csl = cslStyles['http://www.zotero.org/styles/nature']
    const citationsMap = new Map<string, BibliographyItem>(
      list.map((c) => [c._id, c])
    )
    // This will be created just at the init of plugin
    const provider = new CitationProvider({
      getLibraryItem: (id: string) => citationsMap.get(id),
      citationStyle: csl,
    })

    // Load all for first time
    const [meta, initItems] = provider.makeBibliography(list)
    expect(initItems.length).toEqual(2)

    // This will be used by bibliography_item view to render html
    const bibliographyMap = new Map(
      meta.entry_ids.flat().map((id, index) => [id, initItems[index]])
    )

    // Update title for first item
    citationsMap.set(list[0]._id, { ...list[0], title: 'Next-generation +++' })
    const [, updatedItems] = provider.makeBibliography(list)
    expect(updatedItems.join('\n')).toContain('Next-generation +++')

    // Add new item
    citationsMap.set(new_item._id, new_item)
    const [, bibliographyWithNewItem] = provider.makeBibliography(
      list.concat(new_item)
    )
    expect(bibliographyWithNewItem.join('\n')).toContain(
      'Each to each an introduction of each board members'
    )

    // Delete bibliography
    citationsMap.delete(list[1]._id)
    const [, bibliographyAfterRemovingItem] = provider.makeBibliography(
      [list[0]].concat(new_item)
    )
    expect(bibliographyAfterRemovingItem.length).toEqual(2)
  })
})
