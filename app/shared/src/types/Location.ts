import { ValidIATALocation } from '@travelport-czech/valid-objects-ts'

export interface Location {
  readonly code: ValidIATALocation
  readonly name?: string
}
