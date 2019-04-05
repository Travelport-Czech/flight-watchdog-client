import { Button } from '@client/reactComponents/Button'
import { OpenedWindow } from '@client/reactComponents/OpenedWindow'
import { FlightParams } from '@client/types/FlightParams'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidPrice } from '@shared/validObjects/ValidPrice'
import * as React from 'react'

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
