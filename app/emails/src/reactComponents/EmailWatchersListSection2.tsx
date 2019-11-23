import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidLanguage, ValidUrl } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'

interface Props {
  readonly lang: ValidLanguage
  readonly frontendUrl: ValidUrl
}

export class EmailWatchersListSection2 extends React.Component<Props> {
  public render() {
    const { lang, frontendUrl } = this.props

    return (
      <div style={styles.section3email}>
        <div style={styles.headerTextDescription}>
          <table cellSpacing="0" cellPadding="0">
            <tr style={{ height: '10px' }} />
            <tr>
              <td style={{ width: '10px' }} />
              <td style={{ textAlign: 'center' }}>
                <Text name={TranslationEnum.EmailWatcherListDescription} lang={lang}>
                  <a href={frontendUrl.toString()}>{frontendUrl.toString()}</a>
                </Text>
              </td>
              <td style={{ width: '10px' }} />
            </tr>
            <tr style={{ height: '10px' }} />
          </table>
        </div>
      </div>
    )
  }
}
