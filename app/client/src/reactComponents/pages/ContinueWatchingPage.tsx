import { Button } from '@client/reactComponents/Button'
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
  onCreateWatcher(): void
  onClose(event: React.MouseEvent<HTMLElement>): void
}
export class ContinueWatchingPage extends React.Component<Props> {
  public render() {
    const { flightParams, appConfig, onClose, onCreateWatcher } = this.props

    return (
      <OpenedWindow
        handleClose={onClose}
        flightParams={flightParams}
        appConfig={appConfig}
        id="flight-watchdog-window-is-open-continue-watching"
      >
        <p style={styles.simpleText}>
          <Text name={TranslationEnum.ClientMessageContinueWatching} lang={appConfig.lang} />
        </p>
        <Button onClick={onCreateWatcher} id="flight-watchdog-window-continue-watching-clicked-ok">
          <Text name={TranslationEnum.ClientButtonYes} lang={appConfig.lang} />
        </Button>
        <Button
          onClick={onClose}
          id="flight-watchdog-window-continue-watching-clicked-cancel"
          style={{ marginLeft: '5px' }}
        >
          <Text name={TranslationEnum.ClientButtonClose} lang={appConfig.lang} />
        </Button>
      </OpenedWindow>
    )
  }
}
