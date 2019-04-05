import { ValidDate } from '@shared/validObjects/ValidDate'
import { ValidEmail } from '@shared/validObjects/ValidEmail'
import { ValidLanguage } from '@shared/validObjects/ValidLanguage'
import { ValidLocationCodeList } from '@shared/validObjects/ValidLocationCodeList'
import { ValidPrice } from '@shared/validObjects/ValidPrice'
import { ValidWatcherId } from '@shared/validObjects/ValidWatcherId'

export interface AppConfig {
  readonly flightType: 'return' | 'oneway'
  readonly origin: ValidLocationCodeList
  readonly destination: ValidLocationCodeList
  readonly departure: ValidDate
  readonly arrival?: ValidDate
  readonly emailToContinueWatching?: ValidEmail
  readonly watcherIdToDelete?: ValidWatcherId
  readonly emailForWatcherDelete?: ValidEmail
  readonly customerEmail?: ValidEmail
  readonly lowestPrice: ValidPrice
  readonly lang: ValidLanguage
}
