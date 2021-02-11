import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'

interface Props {
    readonly link: string
    readonly lang: SupportedLanguageEnum
}

export class PageWatcherDeleted extends React.Component<Props> {
    public render() {
        const { link, lang } = this.props

        return (
            <div style={{ textAlign: 'center' }}>
                <p>
                    <Text name={TranslationEnum.PageWatcherDeletedSuccess} lang={lang} />
                </p>
                <p>
                    <a href={link.toString()}>
                        <Text name={TranslationEnum.PageContinueToWeb} lang={lang}>
                            {link.toString()}
                        </Text>
                    </a>
                </p>
            </div>
        )
    }
}
