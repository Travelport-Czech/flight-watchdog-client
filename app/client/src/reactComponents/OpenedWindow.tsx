import { Consts } from '@client/Consts'
import { CrossButton } from '@client/reactComponents/CrossButton'
import { AppConfig } from '@client/types/AppConfig'
import { FlightParams } from '@client/types/FlightParams'
import { HeaderDates } from '@shared/reactComponents/HeaderDates'
import { LocationNameList } from '@shared/reactComponents/LocationNameList'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'

interface Props {
  readonly flightParams: FlightParams
  readonly appConfig: AppConfig
  readonly id: string
  handleClose(event: React.MouseEvent<HTMLElement>): void
}

export class OpenedWindow extends React.Component<Props> {
  public render() {
    const { lowestPrice, lang } = this.props.appConfig
    const {
      destination,
      destinationLocationList,
      origin,
      originLocationList,
      flightType,
      departure,
      arrival
    } = this.props.flightParams

    return (
      <div style={styles.windowWrapper}>
        <div
          className={`${Consts.elementClassPrefix}_window`}
          style={styles.window}
          id={this.props.id}
          data-origin={origin.toString()}
          data-destination={destination.toString()}
          data-price={lowestPrice.amount.toString()}
          data-flighttype={flightType}
        >
          <div style={styles.section1client}>
            <CrossButton onClick={this.props.handleClose} />
            <div style={styles.section1textClient}>
              <Text name={TranslationEnum.ClientTitle} lang={lang} />
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
              {arrival ? (
                <Text name={TranslationEnum.ClientDestinationsReturn} lang={lang} />
              ) : (
                <Text name={TranslationEnum.ClientDestinationsOneway} lang={lang} />
              )}
              <br />
              <br />
              <HeaderDates departure={departure} arrival={arrival} lang={lang} />
            </div>
          </div>
          <div style={styles.section3} className="content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
