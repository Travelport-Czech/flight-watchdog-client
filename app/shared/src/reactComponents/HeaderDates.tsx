import { ValidDate } from '@ceesystems/valid-objects-ts'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

interface Props {
  readonly departure: ValidDate
  readonly arrival?: ValidDate
}

export class HeaderDates extends React.Component<Props> {
  public render() {
    const { departure, arrival } = this.props
    const dateFormat = renderToStaticMarkup(<Text name={TranslationEnum.FormatDateWithDayName} />)

    if (arrival) {
      return (
        <Text name={TranslationEnum.ClientDatesReturn}>
          {departure.formatToLocal(dateFormat)}
          {arrival.formatToLocal(dateFormat)}
        </Text>
      )
    }

    return <Text name={TranslationEnum.ClientDatesOneway}>{departure.formatToLocal(dateFormat)}</Text>
  }
}
