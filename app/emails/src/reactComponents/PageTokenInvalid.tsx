import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

interface Props {
    readonly lang: SupportedLanguageEnum
}

export class PageTokenInvalid extends React.Component<Props> {
    public render() {
        const { lang } = this.props

        return (
            <div style={{ textAlign: 'center' }}>
                <p>
                    <Text name={TranslationEnum.PageTokenNotValid} lang={lang} />
                </p>
            </div>
        )
    }
}
