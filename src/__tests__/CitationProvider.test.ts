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

import { buildCitations } from '../citation-builder'
import { CitationProvider } from '../CitationProvider'
import defaultLocal from '../defaultLocale'
import { bibliographyItemModels, citationModels } from './citation-data'
import { cslStyles } from './csl-styles'

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

      const citations = buildCitations(citationModels, getLibraryItem)

      const generatedCitations = citationProvider.rebuildState(citations)

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
