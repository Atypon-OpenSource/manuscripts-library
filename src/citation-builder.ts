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

import type { BibliographyItem, Citation } from '@manuscripts/json-schema'
import CiteProc from 'citeproc'

type DisplayScheme =
  | 'show-all'
  | 'author-only'
  | 'suppress-author'
  | 'composite'

const chooseMode = (displayScheme?: DisplayScheme) => {
  if (displayScheme === 'show-all') {
    return undefined
  }

  return displayScheme
}

export const buildCitations = (
  citations: Citation[],
  getBibliographyItem: (id: string) => BibliographyItem | undefined
): CiteProc.Citation[] =>
  citations.map((citation) => ({
    citationID: citation._id,
    citationItems: citation.embeddedCitationItems.map((item) => ({
      id: item.bibliographyItem,
      data: getBibliographyItem(item.bibliographyItem),
    })),
    properties: {
      noteIndex: 0,
      mode: chooseMode(citation.displayScheme),
      prefix: citation.prefix,
      suffix: citation.suffix,
      infix:
        citation.displayScheme === 'composite' ? citation.infix : undefined,
    },
  }))

export const buildBibliographyItems = (
  citations: Citation[],
  getBibliographyItem: (id: string) => BibliographyItem | undefined
): BibliographyItem[] => {
  const itemIDs: Set<string> = new Set<string>()
  citations
    .flatMap((c) => c.embeddedCitationItems)
    .map((i) => i.bibliographyItem)
    .forEach(itemIDs.add)

  const items: BibliographyItem[] = []
  itemIDs.forEach((id) => {
    const item = getBibliographyItem(id)
    if (item) {
      items.push(item)
    }
  })

  return items
}
