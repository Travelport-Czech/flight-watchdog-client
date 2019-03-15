import { ClientSettings } from 'src/types/ClientSettings'
import { ValidEmail } from 'src/validObjects/ValidEmail'
import { ValidLanguage } from 'src/validObjects/ValidLanguage'
import { ValidPrice } from 'src/validObjects/ValidPrice'

export interface Props {
  readonly userEmail?: ValidEmail
  readonly price: ValidPrice
  readonly golUrl: string
  readonly lang: ValidLanguage
  readonly clientSettings: ClientSettings
}
