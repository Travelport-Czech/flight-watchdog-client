import { createWatcherLinks } from '@emails/factories/createWatcherLinks'
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

export class EmailMarketingContent extends React.Component<Props> {
  public render() {
    const { watchersFullInfoList, agencyParams, showSvg } = this.props

    if (watchersFullInfoList.length === 0) {
      throw new AppLogicError('Empty watcher list')
    }

    const watcherLinks = createWatcherLinks(watchersFullInfoList[0].watcher, agencyParams)
    const { lang } = watchersFullInfoList[0].watcher
    const frontendUrl = watcherLinks.frontendUrl

    return (
      <div style={{ textAlign: 'center' }}>
        <table style={{ width: '600px', margin: '0 auto' }}>
          <tr>
            <td>
              <div style={styles.section1email}>
                <div style={styles.section1textEmail}>
                  <Text name={TranslationEnum.EmailMarketingHeader} lang={lang} />
                </div>
              </div>
              <div style={styles.section3}>
                <div style={styles.headerTextDescription}>
                  <Text name={TranslationEnum.EmailMarketingDescription} lang={lang}>
                    <a href={frontendUrl.toString()}>{frontendUrl.toString()}</a>
                  </Text>
                </div>
              </div>
              <WatchersList watchersFullInfoList={watchersFullInfoList} agencyParams={agencyParams} showSvg={showSvg} />
              <div style={styles.section3}>
                <div style={{ ...styles.simpleText, marginBottom: '15px' }}>
                  <Text name={TranslationEnum.EmailFooter} lang={lang} />
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    )
  }
}
