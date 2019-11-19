import { FlightParams } from '@emails/types/FlightParams'
import { ValidPrice } from '@travelport-czech/valid-objects-ts'

export interface FlightResult extends FlightParams {
  readonly price: ValidPrice
}
