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

import { BibliographyItem, Citation } from '@manuscripts/json-schema'
import CiteProc, { Citation as CiteProcCitation } from 'citeproc'

import { variableWrapper } from './citeproc-variable-wrapper'
import { convertBibliographyItemToCSL } from './csl-converter'
import defaultLocale from './defaultLocale'

interface Props {
  getLibraryItem: (id: string) => BibliographyItem | undefined
  citationStyle: string
  locale?: string
}

export class CitationProvider {
  private engine: CiteProc.Engine
  private getLibraryItem: (id: string) => BibliographyItem | undefined

  constructor(props: Props) {
    const { getLibraryItem, citationStyle, locale } = props

    this.getLibraryItem = getLibraryItem
    this.engine = this.createEngine(citationStyle, locale || defaultLocale)
  }

  private createEngine(style: string, locale: string) {
    return new CiteProc.Engine(
      {
        retrieveItem: this.retrieveCiteItem,
        retrieveLocale: (): string => locale,
        variableWrapper,
      },
      style,
      'en-US',
      false
    )
  }

  public recreateEngine(style: string, locale: string): void {
    this.engine = this.createEngine(style, locale)
  }

  private retrieveCiteItem = (id: string): CSL.Data => {
    const c = this.getLibraryItem(id)
    if (c) {
      return convertBibliographyItemToCSL(c)
    }
    throw Error(`Missing CitationProvider citation with id ${id}`)
  }

  public rebuildProcessorState(
    citations: CiteProcCitation[],
    mode?: 'text' | 'html' | 'rtf',
    uncitedItemIDs?: string[]
  ): Array<[string, number, string]> {
    // id, noteIndex, output
    return this.engine.rebuildProcessorState(citations, mode, uncitedItemIDs)
  }

  public makeBibliography(
    citations?: BibliographyItem[]
  ): [CiteProc.BibliographyMetadata, CiteProc.Bibliography] {
    if (citations) {
      this.engine.updateItems(citations.map((c) => c._id))
    }
    return this.engine.makeBibliography()
  }

  public getCitationsText(citations: Citation[]) {
    return citations.map((citation) => {
      const result = this.engine.previewCitationCluster(
        {
          citationID: citation._id,
          citationItems: citation.embeddedCitationItems.map(
            ({ bibliographyItem }) => ({ id: bibliographyItem })
          ),
        },
        [],
        [],
        'text'
      )
      return { id: citation._id, content: result }
    })
  }

  public static makeBibliographyFromCitations(
    citations: BibliographyItem[],
    citationStyle: string,
    locale?: string
  ): [CiteProc.BibliographyMetadata, CiteProc.Bibliography] {
    const citationsMap = new Map(citations.map((c) => [c._id, c]))
    const getLibraryItem = (id: string) => citationsMap.get(id)
    const props = {
      getLibraryItem,
      citationStyle,
      locale,
    }
    const provider = new CitationProvider(props)
    return provider.makeBibliography(citations)
  }
}
