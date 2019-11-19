import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidLanguage, ValidUrl } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'

interface Props {
  readonly link: ValidUrl
  readonly text: TranslationEnum
  readonly lang: ValidLanguage
  readonly style?: React.CSSProperties
}

export class EmailButton extends React.Component<Props> {
  public render() {
    const { link, text, style, lang } = this.props

    return (
      <a href={link.toString()} style={{ ...styles.emailButton, ...style }}>
        <Text name={text} lang={lang} />
      </a>
    )
  }
}
