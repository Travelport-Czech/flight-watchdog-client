import * as React from 'react'
import { Consts } from 'src/client/Consts'
import { CrossButton } from 'src/client/reactComponents/CrossButton'
import { HeaderDates } from 'src/client/reactComponents/HeaderDates'
import { FlightParams } from 'src/client/types/FlightParams'
import { LocationNameList } from 'src/shared/reactComponents/LocationNameList'
import * as styles from 'src/shared/reactComponents/styles'
import { Text } from 'src/shared/translation/Text'
import { TranslationEnum } from 'src/shared/translation/TranslationEnum'
import { ValidPrice } from 'src/shared/validObjects/ValidPrice'

interface Props {
  readonly flightParams: FlightParams
  readonly price: ValidPrice
  readonly id: string
  handleClose(event: React.MouseEvent<HTMLElement>): void
}

export class OpenedWindow extends React.Component<Props> {
  public render() {
    const { destination, destinationLocationList, origin, originLocationList, flightType } = this.props.flightParams
    const destinationTextKey =
      flightType === 'return' ? TranslationEnum.ClientDestinationsReturn : TranslationEnum.ClientDestinationsOneway

    return (
      <div
        className={`${Consts.elementClassPrefix}_window`}
        style={styles.chatBox}
        id={this.props.id}
        data-origin={origin.toString()}
        data-destination={destination.toString()}
        data-price={this.props.price.amount.toString()}
        data-flighttype={flightType}
      >
        <div style={styles.header}>
          <CrossButton onClick={this.props.handleClose} />
          <div style={styles.headerText}>
            <Text name={TranslationEnum.ClientTitle}>{this.props.price.formatToLocale()}</Text>
          </div>
          <div style={styles.headerTextDescription}>
            <Text name={TranslationEnum.ClientDescription} />
          </div>
          <div style={styles.headerDestinations} className={`${Consts.elementClassPrefix}_destionations`}>
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
            <HeaderDates flightParams={this.props.flightParams} />
          </div>
        </div>
        <div className="content" style={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
