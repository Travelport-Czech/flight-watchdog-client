import { ValidPrice } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

interface Props {
    readonly price: ValidPrice
    readonly lang: SupportedLanguageEnum
}

export class Price extends React.Component<Props> {
    public render() {
        const priceToShow = this.props.price.formatToLocale('# ##0,## ¤').replace(/ /g, '\u00a0')
        if (this.props.lang === SupportedLanguageEnum.cs) {
            return priceToShow.replace('CZK', 'Kč')
        }
        return priceToShow
    }
}
