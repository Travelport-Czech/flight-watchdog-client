import * as React from 'react'
import { Button } from 'src/reactComponents/Button'
import { OpenedWindow } from 'src/reactComponents/OpenedWindow'
import * as styles from 'src/styles'
import { Text } from 'src/translation/Text'
import { TranslationEnum } from 'src/translation/TranslationEnum'
import { FlightParams } from 'src/types/FlightParams'
import { ValidPrice } from 'src/validObjects/ValidPrice'

interface Props {
  readonly flightParams: FlightParams
  readonly price: ValidPrice
  onClose(event: React.MouseEvent<HTMLElement>): void
}
export class RemoveMoreWatchersPage extends React.Component<Props> {
  public render() {
    const { flightParams, price, onClose } = this.props

    return (
      <OpenedWindow
        handleClose={onClose}
        flightParams={flightParams}
        price={price}
        id="flight-watchdog-window-is-open-delete-more-watchers"
      >
        <p style={styles.simpleText}>
          <Text name={TranslationEnum.ClientMessageMoreWatchersAlreadyExists} />
        </p>
        <Button onClick={onClose} id="flight-watchdog-window-clicked-ok">
          <Text name={TranslationEnum.ClientButtonOk} />
        </Button>
      </OpenedWindow>
    )
  }
}
