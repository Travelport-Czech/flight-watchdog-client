import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { HeaderDates } from '@shared/reactComponents/HeaderDates'
import { LocationNameList } from '@shared/reactComponents/LocationNameList'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidLanguage } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'
import { ArrowImage } from '@emails/reactComponents/ArrowImage'

interface Props {
  readonly showHtml?: boolean
  readonly watcherFullInfo: WatcherFullInfo
  readonly lang: ValidLanguage
}

export class HeaderDestination extends React.Component<Props> {
  public render() {
    const { watcherFullInfo, lang, showHtml } = this.props
    const { watcher, originLocationList, destinationLocationList } = watcherFullInfo
    const destinationTextKey =
      watcher.flightType === 'return'
        ? TranslationEnum.ClientDestinationsReturn
        : TranslationEnum.ClientDestinationsOneway

    const tableStyle: React.CSSProperties = {
      width: '600px',
      margin: '0 auto',
      background: styles.secondaryBackgroundColor,
      color: 'white',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: '1.4em',
      lineHeight: '1.4em'
    }

    return (
      <React.Fragment>
        <table cellSpacing="0" cellPadding="0" style={tableStyle}>
          <tr style={{ height: '10px' }} />
          <tr>
            <td style={{ width: '10px' }} />
            <td style={{ width: '40%' }}>
              <LocationNameList locationList={originLocationList} />
            </td>
            <td style={{ width: '5px' }} />
            <td style={{ width: '10px' }}>
              <ArrowImage showHtml={showHtml} />
            </td>
            <td style={{ width: '5px' }} />
            <td style={{ width: '40%' }}>
              <LocationNameList locationList={destinationLocationList} />
            </td>
            <td style={{ width: '10px' }} />
          </tr>
          <tr style={{ height: '10px' }} />
        </table>
        <table cellSpacing="0" cellPadding="0" style={tableStyle}>
          <tr>
            <td>
              <Text name={destinationTextKey} lang={lang} />
            </td>
          </tr>
          <tr style={{ height: '10px' }} />
        </table>
        <table cellSpacing="0" cellPadding="0" style={tableStyle}>
          <tr>
            <td>
              <HeaderDates departure={watcher.departure} arrival={watcher.arrival} lang={lang} />
            </td>
          </tr>
          <tr style={{ height: '10px' }} />
        </table>
      </React.Fragment>
    )
  }
}
