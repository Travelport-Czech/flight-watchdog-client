import { ValidPrice } from '@ceesystems/valid-objects-ts'
import { Button } from '@client/reactComponents/Button'
import { OpenedWindow } from '@client/reactComponents/OpenedWindow'
import { FlightParams } from '@client/types/FlightParams'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'

interface Props {
  readonly flightParams: FlightParams
  readonly price: ValidPrice
  onDeleteAndCreateWatcher(): void
  onClose(event: React.MouseEvent<HTMLElement>): void
}
export class RemoveWatcherPage extends React.Component<Props> {
  public render() {
    const { flightParams, price, onClose, onDeleteAndCreateWatcher } = this.props

    return (
      <OpenedWindow
        handleClose={onClose}
        flightParams={flightParams}
        price={price}
        id="flight-watchdog-window-is-open-delete-and-create"
      >
        <p style={styles.simpleText}>
          <Text name={TranslationEnum.ClientMessageWatcherAlreadyExists} />
        </p>
        <Button onClick={onDeleteAndCreateWatcher} id="flight-watchdog-window-clicked-ok">
          <Text name={TranslationEnum.ClientButtonYes} />
        </Button>
        <Button onClick={onClose} style={{ marginLeft: '5px' }} id="flight-watchdog-window-clicked-cancel">
          <Text name={TranslationEnum.ClientButtonClose} />
        </Button>
      </OpenedWindow>
    )
  }
}
