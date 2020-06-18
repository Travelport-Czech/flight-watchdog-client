import { FlightResult } from '@emails/types/FlightResult'
import { PriceHistoryRecord } from '@emails/types/PriceHistory'
import { WatcherParams } from '@emails/types/WatcherParams'
import { Location } from '@shared/types/Location'

export interface WatcherFullInfo {
  readonly watcher: WatcherParams
  readonly originLocationList: Location[]
  readonly destinationLocationList: Location[]
  readonly priceHistory: PriceHistoryRecord[]
  readonly additionalResults: FlightResult[]
}
