import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidLanguage, ValidUrl } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'

interface Props {
  readonly showHtml?: boolean
  readonly lang: ValidLanguage
  readonly frontendUrl: ValidUrl
}

export class EmailWatchersListSection2 extends React.Component<Props> {
  public render() {
    const { showHtml, lang, frontendUrl } = this.props

    if (showHtml) {
      return (
        <div style={{ ...styles.section3email, padding: '20px' }}>
        <div style={styles.headerTextDescription}>
          <Text name={TranslationEnum.EmailWatcherListDescription} lang={lang}>
            <a href={frontendUrl.toString()}>{frontendUrl.toString()}</a>
          </Text>
        </div>
      </div>
      )
    }

    return <img src="cid:watchdogsection2" alt="Section 2" />
  }
}
