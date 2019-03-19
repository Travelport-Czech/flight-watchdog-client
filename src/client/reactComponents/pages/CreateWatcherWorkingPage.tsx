import * as React from 'react'
import { OpenedWindow } from 'src/client/reactComponents/OpenedWindow'
import * as styles from 'src/client/styles'
import { FlightParams } from 'src/client/types/FlightParams'
import { Text } from 'src/shared/translation/Text'
import { TranslationEnum } from 'src/shared/translation/TranslationEnum'
import { ValidPrice } from 'src/shared/validObjects/ValidPrice'

interface Props {
  readonly flightParams: FlightParams
  readonly price: ValidPrice
  onClose(event: React.MouseEvent<HTMLElement>): void
}
export class CreateWatcherWorkingPage extends React.Component<Props> {
  public render() {
    const { flightParams, price, onClose } = this.props

    return (
      <OpenedWindow
        handleClose={onClose}
        flightParams={flightParams}
        price={price}
        id="flight-watchdog-window-is-open-creating"
      >
        <p style={styles.simpleText}>
          <Text name={TranslationEnum.ClientMessageCreateWatcherWorking} />
        </p>
      </OpenedWindow>
    )
  }
}
