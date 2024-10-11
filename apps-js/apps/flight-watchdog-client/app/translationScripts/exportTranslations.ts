import { TranslationEnum } from '../shared/src/translation/TranslationEnum'
import { translations } from '../shared/src/translation/translations'
import { translateExport } from '@travelport-czech/ss-translations-tools'

const fileName = 'translations.xlsx'
translateExport(translations, TranslationEnum, fileName)
