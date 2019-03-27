import * as React from 'react'
import * as styles from 'src/server/reactComponents/styles'
import { WatcherFullInfo } from 'src/server/WatcherFullInfo'
import { LocationNameList } from 'src/shared/reactComponents/LocationNameList'
import { Text } from 'src/shared/translation/Text'
import { TranslationEnum } from 'src/shared/translation/TranslationEnum'

interface Props {
  readonly watcherFullInfo: WatcherFullInfo
}

export class EmailLowerPriceHeader extends React.Component<Props> {
  public render() {
    const { watcherFullInfo } = this.props
    const { watcher, watcherLinks, originLocationList, destinationLocationList } = watcherFullInfo
    const { frontendUrl } = watcherLinks

    return (
      <div style={styles.header}>
        <div style={styles.headerText}>
          <Text name={TranslationEnum.EmailTitle} />
        </div>
        <div style={styles.headerTextDescription}>
          <Text name={TranslationEnum.EmailDescription}>
            <a href={frontendUrl.toString()}>{frontendUrl.toString()}</a>
          </Text>
        </div>

        <div style={styles.headerDestinations}>
          <Text name={TranslationEnum.ClientDestinations}>
            <span style={styles.primaryColor}>
              <LocationNameList locationList={originLocationList} />
            </span>
            <span style={styles.primaryColor}>
              <LocationNameList locationList={destinationLocationList} />
            </span>
          </Text>
        </div>
        <div style={styles.headerDates}>
          <Text name={TranslationEnum.ClientDatesReturn}>
            {watcher.departure.formatToLocalWithDayName()}
            {watcher.arrival.formatToLocalWithDayName()}
          </Text>
        </div>
      </div>
    )
  }
}
