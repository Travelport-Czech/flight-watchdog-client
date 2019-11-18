import { ValidUrl } from '@ceesystems/valid-objects-ts'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { HeaderDates } from '@shared/reactComponents/HeaderDates'
import { LocationNameList } from '@shared/reactComponents/LocationNameList'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'

interface Props {
  readonly watcherFullInfo: WatcherFullInfo
  readonly frontendUrl: ValidUrl
}

export class EmailLowerPriceHeader extends React.Component<Props> {
  public render() {
    const { watcherFullInfo, frontendUrl } = this.props
    const { watcher, originLocationList, destinationLocationList } = watcherFullInfo
    const { lang, departure, arrival } = watcher
    const destinationTextKey =
      watcher.flightType === 'return'
        ? TranslationEnum.ClientDestinationsReturn
        : TranslationEnum.ClientDestinationsOneway

    return (
      <div>
        <div style={styles.section1email}>
          <div style={styles.section1textEmail}>
            <Text name={TranslationEnum.EmailTitle} lang={lang} />
          </div>
        </div>
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
            <HeaderDates departure={departure} arrival={arrival} lang={lang} />
          </div>
        </div>
        <div style={styles.section3}>
          <Text name={TranslationEnum.EmailDescription} lang={lang}>
            <a href={frontendUrl.toString()}>{frontendUrl.toString()}</a>
          </Text>
        </div>
      </div>
    )
  }
}
