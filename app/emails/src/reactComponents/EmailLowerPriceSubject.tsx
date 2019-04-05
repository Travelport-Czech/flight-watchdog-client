import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidLocationCodeList } from '@shared/validObjects/ValidLocationCodeList'
import * as React from 'react'

interface Props {
  readonly origin: ValidLocationCodeList
  readonly destination: ValidLocationCodeList
}

export class EmailLowerPriceSubject extends React.Component<Props> {
  public render() {
    return (
      <Text name={TranslationEnum.EmailLowerPriceSubject}>
        {this.props.origin.toString()}
        {this.props.destination.toString()}
      </Text>
    )
  }
}
