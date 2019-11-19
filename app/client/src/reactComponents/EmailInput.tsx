import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidLanguage } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'
import { renderToString } from 'react-dom/server'

interface Props {
  readonly value?: string
  readonly lang: ValidLanguage
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
}

export class EmailInput extends React.Component<Props> {
  public render() {
    const placeholder: string = renderToString(
      <Text name={TranslationEnum.ClientInputEmailPlaceholder} lang={this.props.lang} />
    )

    return (
      <input placeholder={placeholder} style={styles.input} value={this.props.value} onChange={this.props.onChange} />
    )
  }
}
