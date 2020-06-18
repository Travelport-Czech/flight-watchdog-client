import { WatchersGraphPriceHistory } from '@emails/reactComponents/WatchersGraphPriceHistory'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import * as React from 'react'

interface Props {
  readonly watchersFullInfo: WatcherFullInfo
  readonly showSvg?: boolean
}

export class WatcherPriceHistory extends React.Component<Props> {
  public render() {
    const { watchersFullInfo, showSvg } = this.props

    const { watcher, priceHistory } = watchersFullInfo

    const imageSrc = 'cid:' + watcher.id.toString()

    return showSvg ? (
      <WatchersGraphPriceHistory priceHistory={priceHistory} priceLimit={watcher.priceLimit} watcher={watcher} />
    ) : (
      <img src={imageSrc} alt="Price history" />
    )
  }
}
