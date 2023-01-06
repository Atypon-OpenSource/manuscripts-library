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

import { schema } from '@manuscripts/manuscript-transform'
import { Node } from 'prosemirror-model'

import { createBibliographyElementContents } from '../citation-builder'

describe('citation-builder', () => {
  test('generates bibliography element contents', () => {
    const node = Node.fromJSON(schema, {
      type: 'bibliography_element',
      attrs: {},
    })

    const id = 'MPBibliographyElement:1'

    const items: string[] = ['1.foo', '2. bar', '3. baz']

    const result = createBibliographyElementContents(
      items,
      id,
      node.attrs.placeholder
    )

    expect(result.outerHTML).toBe(
      `<div class="csl-bib-body" id="MPBibliographyElement:1">1.foo\n2. bar\n3. baz</div>`
    )
  })

  test('generates empty bibliography element contents', () => {
    const node = Node.fromJSON(schema, {
      type: 'bibliography_element',
      attrs: {},
    })

    const id = 'MPBibliographyElement:1'

    const items: string[] = []

    const result = createBibliographyElementContents(
      items,
      id,
      node.attrs.placeholder
    )

    expect(result.outerHTML).toBe(
      `<div class="csl-bib-body empty-node" id="MPBibliographyElement:1"></div>`
    )
  })
})
