import * as React from 'react'
import { Text } from 'src/shared/translation/Text'
import { TranslationEnum } from 'src/shared/translation/TranslationEnum'
import { ValidDate } from 'src/shared/validObjects/ValidDate'

interface Props {
  readonly departure: ValidDate
  readonly arrival?: ValidDate
}

export class HeaderDates extends React.Component<Props> {
  public render() {
    const { departure, arrival } = this.props

    if (arrival) {
      return (
        <Text name={TranslationEnum.ClientDatesReturn}>
          {departure.formatToLocalWithDayName()}
          {arrival.formatToLocalWithDayName()}
        </Text>
      )
    }

    return <Text name={TranslationEnum.ClientDatesOneway}>{departure.formatToLocalWithDayName()}</Text>
  }
}
