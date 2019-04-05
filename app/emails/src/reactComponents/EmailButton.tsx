import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidUrl } from '@shared/validObjects/ValidUrl'
import * as React from 'react'

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
