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

import {
  isCitationNode,
  ManuscriptNode,
} from '@manuscripts/manuscript-transform'
import type {
  BibliographyItem,
  Citation,
  CitationItem,
  Model,
} from '@manuscripts/manuscripts-json-schema'
import CiteProc from 'citeproc'

import type { CitationNodes } from './types'

export const buildCitationNodes = (
  doc: ManuscriptNode,
  getModel: <T extends Model>(id: string) => T | undefined
): CitationNodes => {
  const citationNodes: CitationNodes = []

  doc.descendants((node: Node, pos: number) => {
    if (isCitationNode(node)) {
      const citation = getModel<Citation>(node.attrs.rid)

      if (citation) {
        citationNodes.push([node, pos, citation])
      }
    }
  })

  return citationNodes
}

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
  citationNodes: CitationNodes,
  getLibraryItem: (id: string) => BibliographyItem | undefined
): CiteProc.Citation[] =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  citationNodes.map(([node, pos, citation]) => ({
    citationID: citation._id,
    citationItems: citation.embeddedCitationItems.map(
      (citationItem: CitationItem) => ({
        id: citationItem.bibliographyItem,
        data: getLibraryItem(citationItem.bibliographyItem), // for comparison
      })
    ),
    properties: {
      noteIndex: 0,
      mode: chooseMode(citation.displayScheme),
      prefix: citation.prefix,
      suffix: citation.suffix,
      infix:
        citation.displayScheme === 'composite' ? citation.infix : undefined,
    },
  }))

export const createBibliographyElementContents = (
  bibliographyItems: string[],
  id?: string,
  placeholder?: string
): HTMLElement => {
  const contents = document.createElement('div')
  contents.classList.add('csl-bib-body')
  id && contents.setAttribute('id', id)

  if (bibliographyItems.length) {
    contents.innerHTML = bibliographyItems.join('\n')
  } else {
    contents.classList.add('empty-node')
    placeholder && contents.setAttribute('data-placeholder', placeholder)
  }

  return contents
}
