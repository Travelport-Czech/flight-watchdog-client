import { WatchersGraphPriceHistory } from '@emails/reactComponents/WatchersGraphPriceHistory'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import * as React from 'react'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

interface Props {
  readonly watchersFullInfo: WatcherFullInfo
  readonly showSvg?: boolean
  readonly lang: SupportedLanguageEnum
}

export class WatcherPriceHistory extends React.Component<Props> {
  public render() {
    const { watchersFullInfo, showSvg, lang } = this.props

    const { watcher, priceHistory } = watchersFullInfo

    const imageSrc = 'cid:' + watcher.id.toString()

    return showSvg ? (
      <WatchersGraphPriceHistory
        priceHistory={priceHistory}
        priceLimit={watcher.priceLimit}
        watcher={watcher}
        lang={lang}
      />
    ) : (
      <img src={imageSrc} alt="Price history" />
    )
  }
}
