import { ValidLocationCode } from 'src/client/validObjects/ValidLocationCode'

export interface Location {
  readonly code: ValidLocationCode
  readonly name?: string
}
