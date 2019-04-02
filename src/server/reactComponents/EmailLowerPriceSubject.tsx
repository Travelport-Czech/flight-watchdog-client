import * as React from 'react'
import { Text } from 'src/shared/translation/Text'
import { TranslationEnum } from 'src/shared/translation/TranslationEnum'
import { ValidLocationCodeList } from 'src/shared/validObjects/ValidLocationCodeList'

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
