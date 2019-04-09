import { createWatcherLinks } from '@emails/factories/createWatcherLinks'
import { EmailButton } from '@emails/reactComponents/EmailButton'
import { WatcherPriceHistory } from '@emails/reactComponents/WatcherPriceHistory'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { AppLogicError } from '@shared/errors/AppLogicError'
import { HeaderDates } from '@shared/reactComponents/HeaderDates'
import { LocationNameList } from '@shared/reactComponents/LocationNameList'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'

interface Props {
  readonly watchersFullInfoList: WatcherFullInfo[]
  readonly agencyParams: AgencyParams
  readonly showSvg?: boolean
}

export class WatchersList extends React.Component<Props> {
  public render() {
    const { watchersFullInfoList, agencyParams, showSvg } = this.props

    if (watchersFullInfoList.length === 0) {
      throw new AppLogicError('Empty watcher list')
    }

    const lines = watchersFullInfoList.map((watchersFullInfo: WatcherFullInfo, index) => {
      const { watcher, originLocationList, destinationLocationList } = watchersFullInfo
      const watcherLinks = createWatcherLinks(watcher, agencyParams)
      const destinationTextKey =
        watcher.flightType === 'return'
          ? TranslationEnum.ClientDestinationsReturn
          : TranslationEnum.ClientDestinationsOneway

      return (
        <div key={index} style={styles.emailBlock}>
          <div style={styles.headerDestinations}>
            <div style={styles.headerDestinations}>
              <Text name={destinationTextKey}>
                <span style={styles.primaryColor}>
                  <LocationNameList locationList={originLocationList} />
                </span>
                <span style={styles.primaryColor}>
                  <LocationNameList locationList={destinationLocationList} />
                </span>
              </Text>
            </div>
          </div>
          <div style={styles.headerDates}>
            <HeaderDates departure={watcher.departure} arrival={watcher.arrival} />
          </div>

          <WatcherPriceHistory watchersFullInfo={watchersFullInfo} showSvg={showSvg} />

          <div style={styles.simpleText}>
            <Text name={TranslationEnum.EmailPriceLimit}>{watcher.priceLimit.toString()}</Text>
          </div>

          <table>
            <tr>
              <td>
                <EmailButton link={watcherLinks.resultLink} text={TranslationEnum.EmailButtonShowResult} />
              </td>
              <td>
                <EmailButton
                  link={watcherLinks.deleteLink}
                  text={TranslationEnum.EmailButtonDelete}
                  style={{
                    width: 'auto',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 'normal',
                    textDecoration: 'underline'
                  }}
                />
              </td>
            </tr>
          </table>
        </div>
      )
    })

    return <React.Fragment>{lines}</React.Fragment>
  }
}
