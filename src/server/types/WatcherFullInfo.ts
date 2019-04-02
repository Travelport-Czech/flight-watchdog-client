import { Location } from 'src/server/types/Location'
import { SearchResult } from 'src/server/types/SearchResult'
import { WatcherLinks } from 'src/server/types/WatcherLinks'
import { WatcherParams } from 'src/server/types/WatcherParams'

export interface WatcherFullInfo {
  readonly watcher: WatcherParams
  readonly watcherLinks: WatcherLinks
  readonly originLocationList: Location[]
  readonly destinationLocationList: Location[]
  readonly searchResults: SearchResult[]
}
