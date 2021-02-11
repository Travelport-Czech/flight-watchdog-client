import { OpenedWindow } from '@client/reactComponents/OpenedWindow'
import { AppConfig } from '@client/types/AppConfig'
import { FlightParams } from '@client/types/FlightParams'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'

interface Props {
    readonly flightParams: FlightParams
    readonly appConfig: AppConfig
    onClose(event: React.MouseEvent<HTMLElement>): void
}
export class RemoveWatcherWorkingPage extends React.Component<Props> {
    public render() {
        const { flightParams, appConfig, onClose } = this.props

        return (
            <OpenedWindow
                handleClose={onClose}
                flightParams={flightParams}
                appConfig={appConfig}
                id="flight-watchdog-window-is-deleting"
            >
                <p style={styles.simpleText}>
                    <Text name={TranslationEnum.ClientMessageDeleteWatcherWorking} lang={appConfig.lang} />
                </p>
            </OpenedWindow>
        )
    }
}
