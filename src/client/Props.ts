import { AppConfig } from 'src/client/types/AppConfig'
import { ClientSettings } from 'src/client/types/ClientSettings'

export interface Props {
  readonly appConfig: AppConfig
  readonly clientSettings: ClientSettings
}
