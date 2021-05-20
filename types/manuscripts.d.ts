declare module '@manuscripts/csl-locales/dist/locales.json' {
  import CiteProc from 'citeproc'

  const data: Record<string, CiteProc.Locale>
  export default data
}