import { ValidPrice } from '@ceesystems/valid-objects-ts'
import * as React from 'react'

interface Props {
  readonly price: ValidPrice
}

export class Price extends React.Component<Props> {
  public render() {
    return this.props.price.formatToLocale('# ##0,## ¤')
  }
}
