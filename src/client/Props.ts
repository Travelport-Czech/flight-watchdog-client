import { AppConfig } from 'src/client/types/AppConfig'
import { ClientSettings } from 'src/client/types/ClientSettings'
import { ValidEmail } from 'src/shared/validObjects/ValidEmail'
import { ValidLanguage } from 'src/shared/validObjects/ValidLanguage'
import { ValidPrice } from 'src/shared/validObjects/ValidPrice'

export interface Props {
  readonly userEmail?: ValidEmail
  readonly price: ValidPrice
  readonly appConfig: AppConfig
  readonly lang: ValidLanguage
  readonly clientSettings: ClientSettings
}
