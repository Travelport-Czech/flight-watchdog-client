import { ClientSettings } from 'src/client/types/ClientSettings'
import { ValidEmail } from 'src/client/validObjects/ValidEmail'
import { ValidLanguage } from 'src/client/validObjects/ValidLanguage'
import { ValidPrice } from 'src/client/validObjects/ValidPrice'

export interface Props {
  readonly userEmail?: ValidEmail
  readonly price: ValidPrice
  readonly golUrl: string
  readonly lang: ValidLanguage
  readonly clientSettings: ClientSettings
}
