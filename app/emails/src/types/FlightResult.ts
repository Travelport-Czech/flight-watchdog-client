import { ValidPrice } from '@ceesystems/valid-objects-ts'
import { FlightParams } from '@emails/types/FlightParams'

export interface FlightResult extends FlightParams {
  readonly price: ValidPrice
}
