declare module '@manuscripts/data/dist/csl/locales/locales.json' {
  import CiteProc from 'citeproc'

  const data: Record<string, CiteProc.Locale>
  export default data
}