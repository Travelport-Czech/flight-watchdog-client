import * as React from 'react'
import { Consts } from 'src/client/Consts'
import * as styles from 'src/client/styles'
import { Text } from 'src/shared/translation/Text'
import { TranslationEnum } from 'src/shared/translation/TranslationEnum'

interface Props {
  handleOpen(event: React.MouseEvent<HTMLInputElement>): void
}

export class ClosedWindow extends React.Component<Props> {
  public render() {
    return (
      <div
        className={`${Consts.elementClassPrefix}_window`}
        style={styles.chatBox}
        id="flight-watchdog-window-is-closed"
      >
        <span style={styles.icon} />
        <input
          type="checkbox"
          checked
          readOnly
          style={styles.checkBoxInput}
          onClick={this.props.handleOpen}
          placeholder="placeholder"
          aria-checked="false"
        />
        <label style={styles.label} id="flight-watchdog-window-clicked-open-minimalized">
          <Text name={TranslationEnum.ClientMessageMinimalizedWindow} />
        </label>
      </div>
    )
  }
}
