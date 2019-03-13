import { StepToShow } from 'src/StepsToShow'
import { Location } from 'src/validObjects/Location'

interface FakeGolUrlParams {
  readonly returnTicket: boolean
  readonly origin: string
  readonly destination: string
  readonly departure: string
  readonly arrival: string
  readonly step: boolean
  readonly emailToContinueWatching?: string
  readonly watcherIdToDelete?: string
}

export interface FakeState {
  readonly stepToShow: StepToShow
  readonly golUrlParams?: FakeGolUrlParams
  readonly email: string
  readonly price?: number
  readonly showBadEmailError: boolean
  readonly originLocationList: Location[]
  readonly destinationLocationList: Location[]
}
