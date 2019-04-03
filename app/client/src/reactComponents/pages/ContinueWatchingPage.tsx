import { Button } from 'client/reactComponents/Button'
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
