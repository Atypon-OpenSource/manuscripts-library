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

import { Bundle, ObjectTypes } from '@manuscripts/json-schema'
import { CitationNode, schema } from '@manuscripts/transform'

import { buildCitations } from '../citation-builder'
import { CitationProvider } from '../CitationProvider'
import { loadCitationStyle } from '../csl-styles'
import { bibliographyItemModels, citationModels } from './citation-data'

describe('CitationProvider', () => {
  test('generates bibliography', async () => {
    const getLibraryItem = (id: string) =>
      bibliographyItemModels.filter((i) => i._id === id)[0]

    const cslIdentifiers = [
      'http://www.zotero.org/styles/nature',
      'http://www.zotero.org/styles/science',
      'http://www.zotero.org/styles/plos',
      'http://www.zotero.org/styles/peerj',
      'http://www.zotero.org/styles/american-medical-association',
      'http://www.zotero.org/styles/3-biotech', // has independent-parent
      'http://www.zotero.org/styles/infection-and-immunity', // has independent-parent
    ]

    for (const cslIdentifier of cslIdentifiers) {
      const bundle: Bundle = {
        _id: 'MPBundle:test',
        objectType: ObjectTypes.Bundle,
        createdAt: 0,
        updatedAt: 0,
        csl: { cslIdentifier },
      }

      const citationStyle = await loadCitationStyle({ bundle })

      const citationProvider = new CitationProvider({
        lang: 'en-US',
        citationStyle,
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
})
