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

import { BibliographyItem } from '@manuscripts/json-schema'

export const matchLibraryItemByIdentifier = (
  item: BibliographyItem,
  library: Map<string, BibliographyItem>
): BibliographyItem | undefined => {
  if (library.has(item._id)) {
    return library.get(item._id)
  }

  if (item.DOI) {
    const doi = item.DOI.toLowerCase()

    for (const model of library.values()) {
      if (model.DOI && model.DOI.toLowerCase() === doi) {
        return model
      }
    }
  }

  if (item.PMID) {
    for (const model of library.values()) {
      if (model.PMID && model.PMID === item.PMID) {
        return model
      }
    }
  }

  if (item.URL) {
    const url = item.URL.toLowerCase()

    for (const model of library.values()) {
      if (model.URL && model.URL.toLowerCase() === url) {
        return model
      }
    }
  }
}

export const bibliographyItemTypes = new Map<CSL.ItemType, string>([
  ['article', 'Article'],
  ['article-journal', 'Journal Article'],
  ['article-magazine', 'Magazine Article'],
  ['article-newspaper', 'Newspaper Article'],
  ['bill', 'Bill'],
  ['book', 'Book'],
  ['broadcast', 'Broadcast'],
  ['chapter', 'Chapter'],
  ['dataset', 'Dataset'],
  ['entry', 'Entry'],
  ['entry-dictionary', 'Dictionary Entry'],
  ['entry-encyclopedia', 'Encyclopedia Entry'],
  ['figure', 'Figure'],
  ['graphic', 'Graphic'],
  ['interview', 'Interview'],
  ['legal_case', 'Legal Case'],
  ['legislation', 'Legislation'],
  ['manuscript', 'Manuscript'],
  ['map', 'Map'],
  ['motion_picture', 'Motion Picture'],
  ['musical_score', 'Musical Score'],
  ['pamphlet', 'Pamphlet'],
  ['paper-conference', 'Conference Paper'],
  ['patent', 'Patent'],
  ['personal_communication', 'Personal Communication'],
  ['post', 'Post'],
  ['post-weblog', 'Blog Post'],
  ['report', 'Report'],
  ['review', 'Review'],
  ['review-book', 'Book Review'],
  ['song', 'Song'],
  ['speech', 'Speech'],
  ['thesis', 'Thesis'],
  ['treaty', 'Treaty'],
  ['webpage', 'Web Page'],
])
