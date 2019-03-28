import * as React from 'react'
import { Button } from 'src/client/reactComponents/Button'
import { OpenedWindow } from 'src/client/reactComponents/OpenedWindow'
import { FlightParams } from 'src/client/types/FlightParams'
import * as styles from 'src/shared/reactComponents/styles'
import { Text } from 'src/shared/translation/Text'
import { TranslationEnum } from 'src/shared/translation/TranslationEnum'
import { ValidPrice } from 'src/shared/validObjects/ValidPrice'

interface Props {
  readonly flightParams: FlightParams
  readonly price: ValidPrice
  onClose(event: React.MouseEvent<HTMLElement>): void
}
export class CreateWatcherDonePage extends React.Component<Props> {
  public render() {
    const { flightParams, price, onClose } = this.props

    return (
      <OpenedWindow
        handleClose={onClose}
        flightParams={flightParams}
        price={price}
        id="flight-watchdog-window-is-open-create-done"
      >
        <p style={styles.simpleText}>
          <Text name={TranslationEnum.ClientMessageCreateWatcherDone} />
        </p>
        <Button onClick={onClose}>
          <Text name={TranslationEnum.ClientButtonOk} />
        </Button>
      </OpenedWindow>
    )
  }
}
