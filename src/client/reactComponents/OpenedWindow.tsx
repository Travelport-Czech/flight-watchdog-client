import * as React from 'react'
import { CrossButton } from 'src/client/reactComponents/CrossButton'
import { LocationNameList } from 'src/client/reactComponents/LocationNameList'
import * as styles from 'src/client/styles'
import { Text } from 'src/client/translation/Text'
import { TranslationEnum } from 'src/client/translation/TranslationEnum'
import { FlightParams } from 'src/client/types/FlightParams'
import { ValidPrice } from 'src/client/validObjects/ValidPrice'

interface Props {
  readonly flightParams: FlightParams
  readonly price: ValidPrice
  readonly id: string
  handleClose(event: React.MouseEvent<HTMLElement>): void
}

export class OpenedWindow extends React.Component<Props> {
  public render() {
    const {
      arrival,
      departure,
      destination,
      destinationLocationList,
      origin,
      originLocationList
    } = this.props.flightParams

    return (
      <div
        className="chat-box"
        style={styles.chatBox}
        id={this.props.id}
        data-origin={origin.toString()}
        data-destination={destination.toString()}
        data-price={this.props.price.amount.toString()}
      >
        <div style={styles.header}>
          <CrossButton onClick={this.props.handleClose} />
          <div style={styles.headerText}>
            <Text name={TranslationEnum.ClientTitle}>{this.props.price.formatToLocale()}</Text>
          </div>
          <div style={styles.headerTextDescription}>
            <Text name={TranslationEnum.ClientDescription} />
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
            <Text name={TranslationEnum.ClientDates}>
              {departure.formatToLocalWithDayName()}
              {arrival.formatToLocalWithDayName()}
            </Text>
          </div>
        </div>
        <div className="content" style={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
