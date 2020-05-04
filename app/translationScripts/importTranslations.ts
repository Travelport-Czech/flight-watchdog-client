import { translateImport } from '@travelport-czech/ss-translations-tools'
import * as path from 'path'

const fileName = path.resolve('translations.xlsx')
const alFilePath = 'app/shared/src/translation/alTranslation.ts'
const csFilePath = 'app/shared/src/translation/csTranslation.ts'
const enFilePath = 'app/shared/src/translation/enTranslation.ts'
const skFilePath = 'app/shared/src/translation/skTranslation.ts'

const translationFilePaths = {
  al: alFilePath,
  cs: csFilePath,
  en: enFilePath,
  sk: skFilePath
}

translateImport(fileName, translationFilePaths)
