import {
  ValidDate,
  ValidEmail,
  ValidIATALocationList,
  ValidLanguage,
  ValidPrice,
  ValidString
} from '@travelport-czech/valid-objects-ts'

export interface AppConfig {
  readonly flightType: 'return' | 'oneway'
  readonly origin: ValidIATALocationList
  readonly destination: ValidIATALocationList
  readonly departure: ValidDate
  readonly arrival?: ValidDate
  readonly emailToContinueWatching?: ValidEmail
  readonly watcherIdToDelete?: ValidString
  readonly emailForWatcherDelete?: ValidEmail
  readonly customerEmail?: ValidEmail
  readonly lowestPrice: ValidPrice
  readonly lowestPriceCustomCurrency: ValidPrice
  readonly lang: ValidLanguage
}
