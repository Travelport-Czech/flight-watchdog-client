import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'

export class EmailWatcherListSubject extends React.Component {
  public render() {
    return <Text name={TranslationEnum.EmailWatcherListHeader} />
  }
}
