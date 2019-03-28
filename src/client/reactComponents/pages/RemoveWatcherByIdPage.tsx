import * as React from 'react'
import { Button } from 'src/client/reactComponents/Button'
import { OpenedWindow } from 'src/client/reactComponents/OpenedWindow'
import * as styles from 'src/shared/reactComponents/styles'
import { FlightParams } from 'src/client/types/FlightParams'
import { Text } from 'src/shared/translation/Text'
import { TranslationEnum } from 'src/shared/translation/TranslationEnum'
import { ValidPrice } from 'src/shared/validObjects/ValidPrice'

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
