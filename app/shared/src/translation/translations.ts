import { alTranslation } from '@shared/translation/alTranslation'
import { csTranslation } from '@shared/translation/csTranslation'
import { enTranslation } from '@shared/translation/enTranslation'
import { skTranslation } from '@shared/translation/skTranslation'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import { viTranslation } from '@shared/translation/viTranslation'

export const translations = {
    [SupportedLanguageEnum.al]: alTranslation,
    [SupportedLanguageEnum.cs]: csTranslation,
    [SupportedLanguageEnum.en]: enTranslation,
    [SupportedLanguageEnum.sk]: skTranslation,
    [SupportedLanguageEnum.vi]: viTranslation,
}
