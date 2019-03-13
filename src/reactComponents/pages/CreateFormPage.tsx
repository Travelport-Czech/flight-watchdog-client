import * as React from 'react'
import { Button } from 'src/reactComponents/Button'
import { EmailInput } from 'src/reactComponents/EmailInput'
import { OpenedWindow } from 'src/reactComponents/OpenedWindow'
import * as styles from 'src/styles'
import { Text } from 'src/translation/Text'
import { TranslationEnum } from 'src/translation/TranslationEnum'
import { FlightParams } from 'src/types/FlightParams'
import { validateEmail } from 'src/utils/validateEmail'
import { ValidPrice } from 'src/validObjects/ValidPrice'

interface Props {
  readonly email: string
  readonly showBadEmailError: boolean
  readonly flightParams: FlightParams
  readonly price: ValidPrice
  onClose(event: React.MouseEvent<HTMLElement>): void
  onEmailChange(event: React.ChangeEvent<HTMLInputElement>): void
  onCreateWatcher(): void
}
export class CreateFormPage extends React.Component<Props> {
  public render() {
    const { email, showBadEmailError, flightParams, price, onClose, onEmailChange, onCreateWatcher } = this.props
    const isEmailValid = validateEmail(email)

    return (
      <OpenedWindow
        handleClose={onClose}
        flightParams={flightParams}
        price={price}
        id="flight-watchdog-window-is-open-to-create"
      >
        <EmailInput value={email} onChange={onEmailChange} />
        <Button onClick={onCreateWatcher} id="flight-watchdog-window-clicked-create-watcher">
          <Text name={TranslationEnum.ClientButtonCreate} />
        </Button>
        <div style={styles.simpleText}>
          <span style={styles.errorText}>
            {!isEmailValid && showBadEmailError && <Text name={TranslationEnum.ClientBadEmailError} />}
          </span>
          &nbsp;
          <Button
            onClick={onClose}
            asLink
            style={{ float: 'right' }}
            id="flight-watchdog-window-clicked-not-interested"
          >
            <Text name={TranslationEnum.ClientButtonNotInterested} />
          </Button>
        </div>
      </OpenedWindow>
    )
  }
}
