import { ValidDate, ValidEmail, ValidIATALocationList, ValidPrice } from '@travelport-czech/valid-objects-ts'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

export interface AppConfig {
  readonly flightType: 'return' | 'oneway'
  readonly origin: ValidIATALocationList
  readonly destination: ValidIATALocationList
  readonly departure: ValidDate
  readonly arrival?: ValidDate
  readonly emailToContinueWatching?: ValidEmail
  readonly customerEmail?: ValidEmail
  readonly lowestPrice: ValidPrice
  readonly lowestPriceCustomCurrency: ValidPrice
  readonly lang: SupportedLanguageEnum
}
