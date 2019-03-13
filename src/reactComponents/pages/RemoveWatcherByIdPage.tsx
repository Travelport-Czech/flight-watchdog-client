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
  onDelete(): void
  onClose(event: React.MouseEvent<HTMLElement>): void
}
export class RemoveWatcherByIdPage extends React.Component<Props> {
  public render() {
    const { flightParams, price, onClose, onDelete } = this.props

    return (
      <OpenedWindow
        handleClose={onClose}
        flightParams={flightParams}
        price={price}
        id="flight-watchdog-window-is-open-delete-by-id"
      >
        <p style={styles.simpleText}>
          <Text name={TranslationEnum.ClientMessageWatcherDeleteById} />
        </p>
        <Button onClick={onDelete} id="flight-watchdog-window-clicked-delete-by-id-yes">
          <Text name={TranslationEnum.ClientButtonYes} />
        </Button>
        <Button onClick={onClose} style={{ marginLeft: '5px' }} id="flight-watchdog-window-clicked-delete-by-id-cancel">
          <Text name={TranslationEnum.ClientButtonClose} />
        </Button>
      </OpenedWindow>
    )
  }
}
