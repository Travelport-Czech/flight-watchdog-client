import { translations } from '@shared/translation/translations'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { translateExport } from '@travelport-czech/ss-translations-tools'

const fileName = 'translations.xlsx'
translateExport(translations, TranslationEnum, fileName)
