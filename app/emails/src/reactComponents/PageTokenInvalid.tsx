import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidLanguage } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'

interface Props {
  readonly lang: ValidLanguage
}

export class PageTokenInvalid extends React.Component<Props> {
  public render() {
    const { lang } = this.props

    return (
      <div style={{ textAlign: 'center' }}>
        <p>
          <Text name={TranslationEnum.PageTokenNotValid} lang={lang} />
        </p>
      </div>
    )
  }
}
