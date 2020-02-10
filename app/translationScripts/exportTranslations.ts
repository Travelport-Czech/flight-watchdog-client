import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { translations } from '@shared/translation/translations'
import { translateExport } from '@travelport-czech/ss-translations-tools'

const fileName = 'translations.xlsx'
translateExport(translations, TranslationEnum, fileName)
