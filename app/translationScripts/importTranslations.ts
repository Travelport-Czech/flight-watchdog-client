import { translateImport } from '@travelport-czech/ss-translations-tools'

const fileName = 'translations.xlsx'
const alFilePath = 'app/shared/src/translation/alTranslation.ts'
const csFilePath = 'app/shared/src/translation/csTranslation.ts'
const enFilePath = 'app/shared/src/translation/enTranslation.ts'

// tslint:disable-next-line
console.log('Import started from file ' + fileName + '.')

const translationFilePaths = {
  al: alFilePath,
  cs: csFilePath,
  en: enFilePath
}

translateImport(fileName, translationFilePaths)
