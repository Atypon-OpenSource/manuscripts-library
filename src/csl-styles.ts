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
import { Bundle } from '@manuscripts/json-schema'
import { evaluateXPathToString } from 'fontoxpath'

interface Options {
  bundleID?: string
  bundle?: Bundle
  citationStyleData?: string
}

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
    return loadCSLStyle(parentLink)
  }
  return citationStyleData
}

// Needed since optional chaining (and other ES features) won't work with CI's node version
// and there are no preprocessors
const getBundleCslIdentifier = (bundle: Bundle | undefined) =>
  bundle && bundle.csl ? bundle.csl.cslIdentifier : undefined

export const findCSLStyleForBundleID = async (
  bundleID: string
): Promise<string | undefined> => {
  const { default: bundles }: { default: Bundle[] } = await import(
    // @ts-ignore
    '@manuscripts/data/dist/shared/bundles.json'
  )
  const bundle = bundles.find((item) => item._id === bundleID)
  return getBundleCslIdentifier(bundle)
}

export const loadCSLStyle = async (cslIdentifier: string): Promise<string> => {
  const basename = cslIdentifier.split('/').pop()
  if (!basename) {
    throw new Error(`No style name in ${cslIdentifier}`)
  }
  const styles: Record<string, string> = await import(
    `@manuscripts/data/dist/csl/styles/${basename[0]}.json`
  )
  if (!styles[cslIdentifier]) {
    throw new Error(`Style ${cslIdentifier} not found`)
  }
  return styles[cslIdentifier]
}

interface Options {
  bundle?: Bundle
  bundleID?: string
  citationStyleData?: string
}

export const loadCitationStyle = async (opts: Options): Promise<string> => {
  const { bundle, bundleID, citationStyleData } = opts

  if (citationStyleData) {
    return buildDependentStyle(citationStyleData)
  }

  const cslIdentifier = getBundleCslIdentifier(bundle)
  if (cslIdentifier) {
    return buildDependentStyle(await loadCSLStyle(cslIdentifier))
  }

  if (bundleID) {
    const foundBundleID = await findCSLStyleForBundleID(bundleID)
    if (!foundBundleID) {
      throw Error(`No csl style found for bundle ${bundleID}`)
    }
    return buildDependentStyle(await loadCSLStyle(foundBundleID))
  }

  throw Error(
    'No bundle, bundleID or citationStyleData provided for loadCitationStyle'
  )
}
