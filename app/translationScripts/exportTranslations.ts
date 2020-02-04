import { alTranslation } from '@shared/translation/alTranslation'
import { csTranslation } from '@shared/translation/csTranslation'
import { enTranslation } from '@shared/translation/enTranslation'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { translateExport } from '@travelport-czech/ss-translations-tools'

const fileName = 'translations.xlsx'
const translations = {
  al: alTranslation,
  cs: csTranslation,
  en: enTranslation
}

translateExport(translations, TranslationEnum, fileName)
