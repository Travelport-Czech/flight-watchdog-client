import { alTranslation } from '@shared/translation/alTranslation'
import { csTranslation } from '@shared/translation/csTranslation'
import { enTranslation } from '@shared/translation/enTranslation'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

export const translations = {
  [SupportedLanguageEnum.al]: alTranslation,
  [SupportedLanguageEnum.cs]: csTranslation,
  [SupportedLanguageEnum.en]: enTranslation
}
