import * as React from 'react'
import * as styles from 'src/styles'
import { Text } from 'src/translation/Text'
import { TranslationEnum } from 'src/translation/TranslationEnum'

interface Props {
  handleOpen(event: React.MouseEvent<HTMLInputElement>): void
}

export class ClosedWindow extends React.Component<Props> {
  public render() {
    return (
      <div className="chat-box" style={styles.chatBox} id="flight-watchdog-window-is-closed">
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
