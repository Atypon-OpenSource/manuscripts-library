/*!
 * © 2025 Atypon Systems LLC
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
// import { Citation } from "@citation-js/core"
import * as Citation from '@citation-js/core'
import { BibliographyItem } from '@manuscripts/json-schema'

const loadCitationPlugins = async () => {
  await import('@citation-js/plugin-bibtex')
  await import('@citation-js/plugin-ris')
  await import('@citation-js/plugin-doi')
  await import('@citation-js/plugin-csl')
  await import('@citation-js/plugin-pubmed')
  await import('@citation-js/plugin-enw')
}

export const transformBib = async (
  data: string
): Promise<Partial<BibliographyItem>[]> => {
  await loadCitationPlugins()
  const cite = await Citation.Cite.async(data.trim())
  return cite.data.map((entry: Partial<BibliographyItem>) => ({
    ...entry,
    doi: entry.DOI,
    containerTitle: entry['container-title'],
  }))
}
