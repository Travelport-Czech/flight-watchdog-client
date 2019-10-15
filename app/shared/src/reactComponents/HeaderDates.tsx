import { ValidDate, ValidLanguage } from '@ceesystems/valid-objects-ts'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

interface Props {
  readonly departure: ValidDate
  readonly arrival?: ValidDate
  readonly lang: ValidLanguage
}

export class HeaderDates extends React.Component<Props> {
  public render() {
    const { departure, arrival, lang } = this.props
    const dateFormat = renderToStaticMarkup(<Text name={TranslationEnum.FormatDate} lang={lang} />)

    if (arrival) {
      return (
        <Text name={TranslationEnum.ClientDatesReturn} lang={lang}>
          {departure.formatToLocal(dateFormat)}
          {arrival.formatToLocal(dateFormat)}
        </Text>
      )
    }

    return (
      <Text name={TranslationEnum.ClientDatesOneway} lang={lang}>
        {departure.formatToLocal(dateFormat)}
      </Text>
    )
  }
}
