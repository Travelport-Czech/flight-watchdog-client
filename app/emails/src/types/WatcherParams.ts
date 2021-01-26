import { FlightParams } from '@emails/types/FlightParams'
import { ValidDateTime, ValidEmail, ValidPrice } from '@travelport-czech/valid-objects-ts'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

export interface WatcherParams extends FlightParams {
  readonly id: string
  readonly email: ValidEmail
  readonly priceLimit: ValidPrice
  readonly lang: SupportedLanguageEnum
  readonly created: ValidDateTime
}
