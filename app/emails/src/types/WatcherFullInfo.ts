import { Location } from 'emails/types/Location'
import { SearchResult } from 'emails/types/SearchResult'
import { WatcherLinks } from 'emails/types/WatcherLinks'
import { WatcherParams } from 'emails/types/WatcherParams'

export interface WatcherFullInfo {
  readonly watcher: WatcherParams
  readonly watcherLinks: WatcherLinks
  readonly originLocationList: Location[]
  readonly destinationLocationList: Location[]
  readonly searchResults: SearchResult[]
}
