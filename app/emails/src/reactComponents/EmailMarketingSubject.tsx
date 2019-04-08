import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'

export class EmailMarketingSubject extends React.Component {
  public render() {
    return <Text name={TranslationEnum.EmailMarketingHeader} />
  }
}
