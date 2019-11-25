import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidLanguage, ValidUrl } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'

interface Props {
  readonly lang: ValidLanguage
  readonly frontendUrl: ValidUrl
}

export class EmailMarketingSection2 extends React.Component<Props> {
  public render() {
    const { lang, frontendUrl } = this.props

    return (
      <table cellSpacing="0" cellPadding="0" style={{ lineHeight: '25px', background: styles.primaryBackgroundColor }}>
        <tr style={{ height: '10px' }}>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td style={{ width: '10px' }} />
          <td style={{ textAlign: 'center' }}>
            <Text name={TranslationEnum.EmailMarketingDescription} lang={lang}>
              <a href={frontendUrl.toString()}>{frontendUrl.toString()}</a>
            </Text>
          </td>
          <td style={{ width: '10px' }} />
        </tr>
        <tr style={{ height: '10px' }}>
          <td />
          <td />
          <td />
        </tr>
      </table>
    )
  }
}
