import * as fs from 'fs-extra'
import * as xlsx from 'xlsx'

// tslint:disable:non-literal-fs-path

const fileName = 'translations.xlsx'
const csFilePath = 'app/shared/src/translation/csTranslation.ts'
const enFilePath = 'app/shared/src/translation/enTranslation.ts'

// tslint:disable-next-line
console.log('Import started from file ' + fileName + '.')

// tslint:disable-next-line:no-let
let csFile = fs.readFileSync(csFilePath, { encoding: 'utf8' }).toString()
// tslint:disable-next-line:no-let
let enFile = fs.readFileSync(enFilePath, { encoding: 'utf8' }).toString()

const workbook = xlsx.readFile(fileName)
const firstSheetName = workbook.SheetNames[0]
const worksheet = workbook.Sheets[firstSheetName]

interface LangItem {
  readonly key: string
  readonly cs: string
  readonly en: string
}

const data: LangItem[] = xlsx.utils.sheet_to_json(worksheet)
data.map((item: LangItem): void => {
  const regexp = new RegExp('(\\[T\\.' + item.key + '\\]: `)(.*)(`,)')
  csFile = csFile.replace(regexp, '$1' + item.cs + '$3')
  enFile = enFile.replace(regexp, '$1' + item.en + '$3')
})

fs.writeFileSync(csFilePath, csFile)
fs.writeFileSync(enFilePath, enFile)

// tslint:disable-next-line
console.log('Export done.')
