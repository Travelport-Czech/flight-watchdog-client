import { Consts } from '@client/Consts'
import { CrossButton } from '@client/reactComponents/CrossButton'
import { AppConfig } from '@client/types/AppConfig'
import { FlightParams } from '@client/types/FlightParams'
import { HeaderDates } from '@shared/reactComponents/HeaderDates'
import { LocationNameList } from '@shared/reactComponents/LocationNameList'
import { Price } from '@shared/reactComponents/Price'
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
    const {
      destination,
      destinationLocationList,
      origin,
      originLocationList,
      flightType,
      departure,
      arrival
    } = this.props.flightParams
    const destinationTextKey =
      flightType === 'return' ? TranslationEnum.ClientDestinationsReturn : TranslationEnum.ClientDestinationsOneway

    const price = <Price price={this.props.appConfig.lowestPrice}/>
    const priceWithDifferentCurrencies = (
      <React.Fragment>
        <Price price={this.props.appConfig.lowestPrice} /> (
        <Price price={this.props.appConfig.lowestPriceCustomCurrency} />)
      </React.Fragment>
    )

    return (
      <div
        className={`${Consts.elementClassPrefix}_window`}
        style={styles.chatBox}
        id={this.props.id}
        data-origin={origin.toString()}
        data-destination={destination.toString()}
        data-price={this.props.appConfig.lowestPrice.amount.toString()}
        data-flighttype={flightType}
      >
        <div style={styles.header}>
          <CrossButton onClick={this.props.handleClose} />
          <div style={styles.headerText}>
            <Text name={TranslationEnum.ClientTitle}>
              {this.props.appConfig.lowestPrice.currency === this.props.appConfig.lowestPriceCustomCurrency.currency
                ? price
                : priceWithDifferentCurrencies}
            </Text>
          </div>
          <div style={styles.headerTextDescription}>
            <Text name={TranslationEnum.ClientDescription} />
          </div>
          <div style={styles.headerLevel2} className={`${Consts.elementClassPrefix}_destionations`}>
            <Text name={destinationTextKey}>
              <span style={styles.primaryColor}>
                <LocationNameList locationList={originLocationList} />
              </span>
              <span style={styles.primaryColor}>
                <LocationNameList locationList={destinationLocationList} />
              </span>
            </Text>
          </div>
          <div style={styles.headerDates}>
            <HeaderDates departure={departure} arrival={arrival} />
          </div>
        </div>
        <div className="content" style={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
