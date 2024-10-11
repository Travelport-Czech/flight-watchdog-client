import { Location } from '@shared/types/Location'
import { ValidDate, ValidIATALocationList } from '@travelport-czech/valid-objects-ts'

export interface FlightParams {
    readonly origin: ValidIATALocationList
    readonly destination: ValidIATALocationList
    readonly originLocationList: Location[]
    readonly destinationLocationList: Location[]
    readonly departure: ValidDate
    readonly arrival?: ValidDate
    readonly flightType: 'oneway' | 'return'
}
