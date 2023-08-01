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

// @ts-ignore
import { data } from '@manuscripts/examples/data/project-dump-2.json'
import { BibliographyItem, Model } from '@manuscripts/json-schema'
import { Decoder } from '@manuscripts/transform'
import * as CiteProc from 'citeproc'
import { evaluateXPathToString } from 'fontoxpath'

import { buildCitationNodes, buildCitations } from '../citation-builder'
import { CitationProvider } from '../CitationProvider'
import { cslStyles, local } from './csl-styles'

const namespaceMap = new Map<string | null, string>([
  ['csl', 'http://purl.org/net/xbiblio/csl'],
])

const buildDependentStyle = async (citationStyleData: string) => {
  // const parser = CiteProc.setupXml(citationStyleData)
  const doc = new DOMParser().parseFromString(
    citationStyleData,
    'application/xml'
  )
  const parentLink = evaluateXPathToString(
    '/csl:style/csl:info/csl:link[@rel="independent-parent"]/@href',
    doc,
    undefined,
    undefined,
    { namespaceResolver: (prefix: string) => namespaceMap.get(prefix) || null }
  )
  if (parentLink && parentLink.startsWith('http://www.zotero.org/styles/')) {
    // TODO: merge metadata (locales) into parent from child?
    // @ts-ignore
    return cslStyles[parentLink]
  }
  return citationStyleData
}

describe('CitationProvider', () => {
  test('generates bibliography', async () => {
    const modelMap: Map<string, Model> = new Map()

    for (const item of data) {
      modelMap.set(item._id, item as unknown as Model)
    }

    const getModel = <T extends Model>(id: string) =>
      modelMap.get(id) as T | undefined

    const getLibraryItem = (id: string) =>
      modelMap.get(id) as BibliographyItem | undefined

    for (const [cslIdentifier, cslStyle] of Object.entries(cslStyles)) {
      const citationProvider = new CitationProvider({
        lang: 'en-GB',
        local,
        citationStyle: cslStyle,
        getLibraryItem,
      })

      const decoder = new Decoder(modelMap)

      const article = decoder.createArticleNode()

      const citationNodes = buildCitationNodes(article, getModel)

      const citations = buildCitations(citationNodes, getLibraryItem)

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
