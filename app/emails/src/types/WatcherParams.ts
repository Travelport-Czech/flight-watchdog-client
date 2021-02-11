import { FlightParams } from '@emails/types/FlightParams'
import { ValidDateTime, ValidEmail, ValidPrice } from '@travelport-czech/valid-objects-ts'

export interface WatcherParams extends FlightParams {
    readonly id: string
    readonly email: ValidEmail
    readonly priceLimit: ValidPrice
    readonly created: ValidDateTime
}
