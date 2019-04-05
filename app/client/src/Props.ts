import { AppConfig } from '@client/types/AppConfig'
import { ClientSettings } from '@client/types/ClientSettings'

export interface Props {
  readonly appConfig: AppConfig
  readonly clientSettings: ClientSettings
}
