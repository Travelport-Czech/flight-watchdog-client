import { ValidLocationCode } from '@shared/validObjects/ValidLocationCode'

export interface Location {
  readonly code: ValidLocationCode
  readonly name?: string
}
