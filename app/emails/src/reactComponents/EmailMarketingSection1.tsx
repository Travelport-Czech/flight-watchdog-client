import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidLanguage } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'

interface Props {
  readonly showHtml?: boolean
  readonly lang: ValidLanguage
}

export class EmailMarketingSection1 extends React.Component<Props> {
  public render() {
    const { showHtml, lang } = this.props

    if (showHtml) {
      return (
        <div style={styles.section1email}>
          <div style={styles.section1textEmail}>
            <Text name={TranslationEnum.EmailMarketingHeader} lang={lang} />
          </div>
        </div>
      )
    }

    return <img src="cid:watchdogsection1" alt="Watchdog logo" />
  }
}
