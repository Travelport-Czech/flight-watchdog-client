import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { HeaderDates } from '@shared/reactComponents/HeaderDates'
import { LocationNameList } from '@shared/reactComponents/LocationNameList'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidLanguage } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'

interface Props {
  readonly watcherFullInfo: WatcherFullInfo
  readonly lang: ValidLanguage
}

export class HeaderDestination extends React.Component<Props> {
  public render() {
    const { watcherFullInfo, lang } = this.props
    const { watcher, originLocationList, destinationLocationList } = watcherFullInfo
    const destinationTextKey =
      watcher.flightType === 'return'
        ? TranslationEnum.ClientDestinationsReturn
        : TranslationEnum.ClientDestinationsOneway

    return (
      <div style={styles.section2}>
        <div style={styles.section2locations}>
          <div style={styles.section2box}>
            <div style={styles.section2textLeft}>
              <LocationNameList locationList={originLocationList} />
            </div>
          </div>
          <div style={styles.section2box}>
            <div style={styles.section2textRight}>
              <LocationNameList locationList={destinationLocationList} />
            </div>
          </div>
        </div>
        <div style={styles.section2date}>
          <Text name={destinationTextKey} lang={lang} />
          <br />
          <br />
          <HeaderDates departure={watcher.departure} arrival={watcher.arrival} lang={lang} />
        </div>
      </div>
    )
  }
}
