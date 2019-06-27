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
  onDelete(): void
  onClose(event: React.MouseEvent<HTMLElement>): void
}
export class RemoveWatcherByIdPage extends React.Component<Props> {
  public render() {
    const { flightParams, appConfig, onClose, onDelete } = this.props

    return (
      <OpenedWindow
        handleClose={onClose}
        flightParams={flightParams}
        appConfig={appConfig}
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
