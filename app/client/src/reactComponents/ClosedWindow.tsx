import { Consts } from 'client/Consts'
import * as React from 'react'
import * as styles from 'shared/reactComponents/styles'
import { Text } from 'shared/translation/Text'
import { TranslationEnum } from 'shared/translation/TranslationEnum'

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
          value="value"
        />
        <label style={styles.label} id="flight-watchdog-window-clicked-open-minimalized">
          <Text name={TranslationEnum.ClientMessageMinimalizedWindow} />
        </label>
      </div>
    )
  }
}
