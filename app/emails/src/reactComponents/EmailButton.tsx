import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

interface Props {
    readonly link: string
    readonly text: TranslationEnum
    readonly lang: SupportedLanguageEnum
    readonly name: string
    readonly style?: React.CSSProperties
}

export class EmailButton extends React.Component<Props> {
    public render() {
        const { link, text, style, lang, name } = this.props

        const className = `email-button-${name}`

        return (
            <a href={link.toString()} style={{ ...styles.emailButton, ...style }} className={className}>
                <Text name={text} lang={lang} />
            </a>
        )
    }
}
