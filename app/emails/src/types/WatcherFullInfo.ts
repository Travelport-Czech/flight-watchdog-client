import { SearchResult } from '@emails/types/SearchResult'
import { WatcherParams } from '@emails/types/WatcherParams'
import { Location } from '@shared/types/Location'

export interface WatcherFullInfo {
  readonly watcher: WatcherParams
  readonly originLocationList: Location[]
  readonly destinationLocationList: Location[]
  readonly searchResults: SearchResult[]
}
