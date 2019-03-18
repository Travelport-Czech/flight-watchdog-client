import * as React from 'react'
import { Button } from 'src/client/reactComponents/Button'
import { OpenedWindow } from 'src/client/reactComponents/OpenedWindow'
import * as styles from 'src/client/styles'
import { Text } from 'src/client/translation/Text'
import { TranslationEnum } from 'src/client/translation/TranslationEnum'
import { FlightParams } from 'src/client/types/FlightParams'
import { ValidPrice } from 'src/client/validObjects/ValidPrice'

interface Props {
  readonly flightParams: FlightParams
  readonly price: ValidPrice
  onClose(event: React.MouseEvent<HTMLElement>): void
}
export class ErrorPage extends React.Component<Props> {
  public render() {
    const { flightParams, price, onClose } = this.props

    return (
      <OpenedWindow
        handleClose={onClose}
        flightParams={flightParams}
        price={price}
        id="flight-watchdog-window-is-open-error"
      >
        <p style={styles.simpleText}>
          <Text name={TranslationEnum.ClientMessageError} />
        </p>
        <Button onClick={onClose}>
          <Text name={TranslationEnum.ClientButtonClose} />
        </Button>
      </OpenedWindow>
    )
  }
}
