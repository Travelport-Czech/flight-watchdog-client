import { Location } from 'src/server/Location'
import { WatcherLinks } from 'src/server/WatcherLinks'
import { WatcherParams } from 'src/server/WatcherParams'

export interface WatcherFullInfo {
  readonly watcher: WatcherParams
  readonly watcherLinks: WatcherLinks
  readonly originLocationList: Location[]
  readonly destinationLocationList: Location[]
}
