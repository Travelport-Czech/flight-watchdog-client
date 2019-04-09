import { ValidIATALocationList } from '@ceesystems/valid-objects-ts'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'

interface Props {
  readonly origin: ValidIATALocationList
  readonly destination: ValidIATALocationList
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
