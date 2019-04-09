import { ValidIATALocation } from '@ceesystems/valid-objects-ts'

export interface Location {
  readonly code: ValidIATALocation
  readonly name?: string
}
