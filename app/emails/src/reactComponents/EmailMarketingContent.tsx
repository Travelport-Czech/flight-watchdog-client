import { createWatcherLinks } from '@emails/factories/createWatcherLinks'
import { WatchersList } from '@emails/reactComponents/WatchersList'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { AppLogicError } from '@shared/errors/AppLogicError'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidString, ValidUrl } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'

interface Props {
  readonly watchersFullInfoList: WatcherFullInfo[]
  readonly agencyParams: AgencyParams
  readonly showSvg?: boolean
  createLinkToPageWatcherDelete(watcherId: ValidString): ValidUrl
}

export class EmailMarketingContent extends React.Component<Props> {
  public render() {
    const { watchersFullInfoList, agencyParams, showSvg, createLinkToPageWatcherDelete } = this.props

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
              <div style={styles.header}>
                <div style={styles.headerText}>
                  <Text name={TranslationEnum.EmailMarketingHeader} lang={lang} />
                </div>
                <div style={styles.headerTextDescription}>
                  <Text name={TranslationEnum.EmailMarketingDescription} lang={lang}>
                    <a href={frontendUrl.toString()}>{frontendUrl.toString()}</a>
                  </Text>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="content" style={styles.emailTableContent}>
                <div style={{ ...styles.simpleText, marginBottom: '15px' }}>
                  <WatchersList
                    watchersFullInfoList={watchersFullInfoList}
                    agencyParams={agencyParams}
                    showSvg={showSvg}
                    createLinkToPageWatcherDelete={createLinkToPageWatcherDelete}
                  />
                </div>
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
