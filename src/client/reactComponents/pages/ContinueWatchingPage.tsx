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
  onCreateWatcher(): void
  onClose(event: React.MouseEvent<HTMLElement>): void
}
export class ContinueWatchingPage extends React.Component<Props> {
  public render() {
    const { flightParams, price, onClose, onCreateWatcher } = this.props

    return (
      <OpenedWindow
        handleClose={onClose}
        flightParams={flightParams}
        price={price}
        id="flight-watchdog-window-is-open-continue-watching"
      >
        <p style={styles.simpleText}>
          <Text name={TranslationEnum.ClientMessageContinueWatching} />
        </p>
        <Button onClick={onCreateWatcher} id="flight-watchdog-window-continue-watching-clicked-ok">
          <Text name={TranslationEnum.ClientButtonYes} />
        </Button>
        <Button
          onClick={onClose}
          id="flight-watchdog-window-continue-watching-clicked-cancel"
          style={{ marginLeft: '5px' }}
        >
          <Text name={TranslationEnum.ClientButtonClose} />
        </Button>
      </OpenedWindow>
    )
  }
}
