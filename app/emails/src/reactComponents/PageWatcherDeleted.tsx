import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidLanguage, ValidUrl } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'

interface Props {
  readonly link: ValidUrl
  readonly lang: ValidLanguage
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
