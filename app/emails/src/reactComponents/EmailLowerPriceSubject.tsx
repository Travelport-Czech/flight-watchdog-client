import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidIATALocationList } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

interface Props {
    readonly origin: ValidIATALocationList
    readonly destination: ValidIATALocationList
    readonly lang: SupportedLanguageEnum
}

export class EmailLowerPriceSubject extends React.Component<Props> {
    public render() {
        const { origin, destination, lang } = this.props

        return (
            <Text name={TranslationEnum.EmailLowerPriceSubject} lang={lang}>
                {origin.toString()}
                {destination.toString()}
            </Text>
        )
    }
}
