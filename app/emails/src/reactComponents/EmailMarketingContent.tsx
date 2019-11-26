import { createWatcherLinks } from '@emails/factories/createWatcherLinks'
import { EmailMarketingSection1 } from '@emails/reactComponents/EmailMarketingSection1'
import { EmailMarketingSection2 } from '@emails/reactComponents/EmailMarketingSection2'
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
        <table cellSpacing="0" cellPadding="0" style={{ width: '600px', margin: '0 auto', backgroundColor: styles.primaryBackgroundColor }}>
          <tr>
            <td style={{ backgroundColor: 'white' }}>
              <EmailMarketingSection1 lang={lang} showHtml={showSvg} />
            </td>
          </tr>
          <tr>
            <td>
              <EmailMarketingSection2 lang={lang} frontendUrl={frontendUrl} />
            </td>
          </tr>
          <tr>
            <td>    
              <WatchersList watchersFullInfoList={watchersFullInfoList} agencyParams={agencyParams} showSvg={showSvg} />
            </td>
          </tr>
          <tr style={{ height: '10px' }}>
            <td />
          </tr>
          <tr>
            <td>  
              <div style={{ ...styles.simpleText, textAlign: 'center' }}>
                <Text name={TranslationEnum.EmailFooter} lang={lang} />
              </div>
            </td>
          </tr>
          <tr style={{ height: '10px' }}>
            <td />
          </tr>
        </table>
      </div>
    )
  }
}
