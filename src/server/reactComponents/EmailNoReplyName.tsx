import * as React from 'react'
import { Text } from 'src/shared/translation/Text'
import { TranslationEnum } from 'src/shared/translation/TranslationEnum'

export class EmailNoReplyName extends React.Component {
  public render() {
    return <Text name={TranslationEnum.EmailNoReplyName} />
  }
}
