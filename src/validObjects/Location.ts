import { ValidLocationCode } from 'src/validObjects/ValidLocationCode'

export interface Location {
  readonly code: ValidLocationCode
  readonly name?: string
}
