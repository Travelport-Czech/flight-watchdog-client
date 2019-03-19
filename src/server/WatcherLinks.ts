import { ValidUrl } from 'src/shared/validObjects/ValidUrl'

export interface WatcherLinks {
  readonly resultLink: ValidUrl
  readonly continueLink: ValidUrl
  readonly frontendUrl: ValidUrl
  readonly deleteLink: ValidUrl
}
