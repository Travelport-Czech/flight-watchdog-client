import { ValidUrl } from '@travelport-czech/valid-objects-ts'

export interface WatcherLinks {
  readonly resultLink: ValidUrl
  readonly continueLink: ValidUrl
  readonly frontendUrl: ValidUrl
}
