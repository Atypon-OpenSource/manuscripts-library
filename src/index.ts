/*!
 * © 2020 Atypon Systems LLC
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
export { parseBibliography } from './csl-parser'

export { CitationProvider } from './CitationProvider'

export { loadCitationStyle } from './csl-styles'

export {
  matchLibraryItemByIdentifier,
  bibliographyItemTypes,
} from './citation-matcher'

export {
  buildCitationNodes,
  buildCitations,
  createBibliographyElementContents,
} from './citation-builder'

export {
  convertCSLToBibliographyItem,
  convertBibliographyItemToCSL,
  fixCSLData,
} from './csl-converter'

export {
  issuedYear,
  estimateID,
  shortAuthorsString,
  fullAuthorsString,
  authorsString,
  shortLibraryItemMetadata,
  fullLibraryItemMetadata,
} from './citation-utils'

export type { CitationNodes } from './types'
