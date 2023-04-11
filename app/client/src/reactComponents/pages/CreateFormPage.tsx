import { Button } from '@client/reactComponents/Button'
import { EmailInput } from '@client/reactComponents/EmailInput'
import { OpenedWindow } from '@client/reactComponents/OpenedWindow'
import { AppConfig } from '@client/types/AppConfig'
import { FlightParams } from '@client/types/FlightParams'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { validateEmail } from '@shared/utils/validateEmail'
import * as React from 'react'

interface Props {
    readonly email: string
    readonly showBadEmailError: boolean
    readonly flightParams: FlightParams
    readonly appConfig: AppConfig
    onClose(event: React.MouseEvent<HTMLElement>): void
    onEmailChange(event: React.ChangeEvent<HTMLInputElement>): void
    onCreateWatcher(): void
}
export class CreateFormPage extends React.Component<Props> {
    public render() {
        const { email, showBadEmailError, flightParams, appConfig, onClose, onEmailChange, onCreateWatcher } =
            this.props
        const isEmailValid = validateEmail(email)

        return (
            <OpenedWindow
                handleClose={onClose}
                flightParams={flightParams}
                appConfig={appConfig}
                id="flight-watchdog-window-is-open-to-create"
            >
                <EmailInput value={email} onChange={onEmailChange} lang={appConfig.lang} />
                <Button onClick={onCreateWatcher} id="flight-watchdog-window-clicked-create-watcher">
                    <Text name={TranslationEnum.ClientButtonCreate} lang={appConfig.lang} />
                </Button>
                <div style={styles.simpleText}>
                    <span style={styles.errorText}>
                        {!isEmailValid && showBadEmailError && (
                            <Text name={TranslationEnum.ClientBadEmailError} lang={appConfig.lang} />
                        )}
                    </span>
                    &nbsp;
                    <Button
                        onClick={onClose}
                        asLink
                        style={{ float: 'right' }}
                        id="flight-watchdog-window-clicked-not-interested"
                    >
                        <Text name={TranslationEnum.ClientButtonNotInterested} lang={appConfig.lang} />
                    </Button>
                </div>
            </OpenedWindow>
        )
    }
}
