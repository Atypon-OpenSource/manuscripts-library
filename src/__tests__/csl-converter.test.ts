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

import { BibliographyItem, ObjectTypes } from '@manuscripts/json-schema'

import {
  convertBibliographyItemToCSL,
  convertCSLToBibliographyItem,
  fixCSLData,
} from '../csl-converter'

describe('csl-converter', () => {
  test('converts data from CSL to bibliography items', () => {
    const data: CSL.Data = {
      id: 'foo',
      type: 'article',
      DOI: 'foo',
      illustrator: [{ family: 'Derp' }],
      accessed: { literal: 'yesterday' },
    }
    const bibItem = convertCSLToBibliographyItem(data)
    expect(bibItem.DOI).toMatch(data.DOI!)
    expect(bibItem.type).toMatch('article')
    expect(bibItem.illustrator![0].objectType).toMatch(
      ObjectTypes.BibliographicName
    )
  })

  test('converts bibliography items to CSL', () => {
    const item: BibliographyItem = {
      _id: 'MPBibliographyItem:x',
      objectType: 'MPBibliographyItem',
      DOI: 'foo',
      accessed: {
        _id: 'MPBibliographicDate:63937364-97E6-4722-AA96-0841EFBBAA0D',
        literal: 'yesterday',
        objectType: 'MPBibliographicDate',
      },
      illustrator: [
        {
          family: 'Derp',
          objectType: 'MPBibliographicName',
        },
      ],
      type: 'article',
      containerID: 'ProjectX',
      manuscriptID: 'ManuscriptX',
      createdAt: 0,
      updatedAt: 0,
    }
    const data = convertBibliographyItemToCSL(item)

    expect(data).toEqual({
      DOI: 'foo',
      accessed: { literal: 'yesterday' },
      id: 'MPBibliographyItem:x',
      illustrator: [{ family: 'Derp' }],
      type: 'article',
    })

    const itemMissingType = { ...item }
    // @ts-ignore
    delete itemMissingType.type
    const dataWithDefaultType = convertBibliographyItemToCSL(itemMissingType)

    expect(dataWithDefaultType).toEqual({
      DOI: 'foo',
      accessed: { literal: 'yesterday' },
      id: 'MPBibliographyItem:x',
      illustrator: [{ family: 'Derp' }],
      type: 'article-journal',
    })
  })

  test('ensures that string fields do not contain arrays', () => {
    const item: CSL.Data = {
      id: 'test',
      type: 'article-journal',
      title: 'Foo',
      // @ts-ignore
      ISSN: ['1234-5678'],
      issue: 23,
    }

    const result = fixCSLData(item)

    expect(result.title).toBe('Foo')
    expect(result.issue).toBe(23)
    expect(result.ISSN).toBe('1234-5678')
  })
})
