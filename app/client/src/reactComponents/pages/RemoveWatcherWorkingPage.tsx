import { OpenedWindow } from 'client/reactComponents/OpenedWindow'
import { FlightParams } from 'client/types/FlightParams'
import * as React from 'react'
import * as styles from 'shared/reactComponents/styles'
import { Text } from 'shared/translation/Text'
import { TranslationEnum } from 'shared/translation/TranslationEnum'
import { ValidPrice } from 'shared/validObjects/ValidPrice'

interface Props {
  readonly flightParams: FlightParams
  readonly price: ValidPrice
  onClose(event: React.MouseEvent<HTMLElement>): void
}
export class RemoveWatcherWorkingPage extends React.Component<Props> {
  public render() {
    const { flightParams, price, onClose } = this.props

    return (
      <OpenedWindow
        handleClose={onClose}
        flightParams={flightParams}
        price={price}
        id="flight-watchdog-window-is-deleting"
      >
        <p style={styles.simpleText}>
          <Text name={TranslationEnum.ClientMessageDeleteWatcherWorking} />
        </p>
      </OpenedWindow>
    )
  }
}
