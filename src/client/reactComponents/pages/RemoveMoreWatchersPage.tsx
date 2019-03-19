import * as React from 'react'
import { Button } from 'src/client/reactComponents/Button'
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
