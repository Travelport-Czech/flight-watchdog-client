import * as React from 'react'
import * as styles from 'src/server/reactComponents/styles'
import { Text } from 'src/shared/translation/Text'
import { TranslationEnum } from 'src/shared/translation/TranslationEnum'
import { ValidUrl } from 'src/shared/validObjects/ValidUrl'

interface Props {
  readonly link: ValidUrl
  readonly text: TranslationEnum
  readonly style?: React.CSSProperties
}

export class EmailButton extends React.Component<Props> {
  public render() {
    const { link, text, style } = this.props

    return (
      <a href={link.toString()} style={{ ...styles.emailButton, ...style }}>
        <Text name={text} />
      </a>
    )
  }
}
