import * as React from 'react'
import { FlightParams } from 'src/client/types/FlightParams'
import { Text } from 'src/shared/translation/Text'
import { TranslationEnum } from 'src/shared/translation/TranslationEnum'

interface Props {
  readonly flightParams: FlightParams
}

export class HeaderDates extends React.Component<Props> {
  public render() {
    const { flightParams } = this.props

    if (flightParams.arrival) {
      return (
        <Text name={TranslationEnum.ClientDatesReturn}>
          {flightParams.departure.formatToLocalWithDayName()}
          {flightParams.arrival.formatToLocalWithDayName()}
        </Text>
      )
    }

    return <Text name={TranslationEnum.ClientDatesOneway}>{flightParams.departure.formatToLocalWithDayName()}</Text>
  }
}
