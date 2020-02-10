import { translateImport } from '@travelport-czech/ss-translations-tools'

const fileName = 'translations.xlsx'
const csFilePath = 'app/shared/src/translation/csTranslation.ts'
const enFilePath = 'app/shared/src/translation/enTranslation.ts'

// tslint:disable-next-line
console.log('Import started from file ' + fileName + '.')

const translationFilePaths = {
  cs: csFilePath,
  en: enFilePath
}

translateImport(fileName, translationFilePaths)
