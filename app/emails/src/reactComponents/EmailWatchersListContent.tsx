import { createWatcherLinks } from '@emails/factories/createWatcherLinks'
import { EmailWatchersListSection1 } from '@emails/reactComponents/EmailWatchersListSection1'
import { EmailWatchersListSection2 } from '@emails/reactComponents/EmailWatchersListSection2'
import { WatchersList } from '@emails/reactComponents/WatchersList'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { AppLogicError } from '@shared/errors/AppLogicError'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'

interface Props {
  readonly watchersFullInfoList: WatcherFullInfo[]
  readonly agencyParams: AgencyParams
  readonly showSvg?: boolean
}

export class EmailWatchersListContent extends React.Component<Props> {
  public render() {
    const { watchersFullInfoList, agencyParams, showSvg } = this.props

    if (watchersFullInfoList.length === 0) {
      throw new AppLogicError('Empty watcher list')
    }

    const watcherLinks = createWatcherLinks(watchersFullInfoList[0].watcher, agencyParams)
    const lang = watchersFullInfoList[0].watcher.lang
    const frontendUrl = watcherLinks.frontendUrl

    return (
      <div style={{ textAlign: 'center' }}>
        <table cellSpacing="0" cellPadding="0" style={{ width: '600px', margin: '0 auto' }}>
          <tr>
            <td style={{ backgroundColor: styles.primaryBackgroundColor }}>
              <EmailWatchersListSection1 lang={lang} showHtml={showSvg} />
              <EmailWatchersListSection2 lang={lang} frontendUrl={frontendUrl} />
              <WatchersList watchersFullInfoList={watchersFullInfoList} agencyParams={agencyParams} showSvg={showSvg} />
              <br />
              <br />
              <div style={{ ...styles.simpleText, textAlign: 'center' }}>
                <Text name={TranslationEnum.EmailFooter} lang={lang} />
              </div>
              <br />
              <br />
            </td>
          </tr>
        </table>
      </div>
    )
  }
}
