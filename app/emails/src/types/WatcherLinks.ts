import { ValidUrl } from '@ceesystems/valid-objects-ts'

export interface WatcherLinks {
  readonly resultLink: ValidUrl
  readonly continueLink: ValidUrl
  readonly frontendUrl: ValidUrl
  readonly deleteLink: ValidUrl
}
