import { ValidPrice } from '@ceesystems/valid-objects-ts'
import { createWatcherLinks } from '@emails/factories/createWatcherLinks'
import { EmailButton } from '@emails/reactComponents/EmailButton'
import { EmailLowerPriceHeader } from '@emails/reactComponents/EmailLowerPriceHeader'
import { WatcherPriceHistory } from '@emails/reactComponents/WatcherPriceHistory'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import * as React from 'react'

interface Props {
  readonly watcherFullInfo: WatcherFullInfo
  readonly agencyParams: AgencyParams
  readonly price: ValidPrice
  readonly showSvg?: boolean
}

export class EmailLowerPriceContent extends React.Component<Props> {
  public render() {
    const { watcherFullInfo, price, showSvg, agencyParams } = this.props
    const { watcher } = watcherFullInfo
    const watcherLinks = createWatcherLinks(watcher, agencyParams)
    const { resultLink, continueLink, frontendUrl } = watcherLinks

    const priceDiff = watcher.priceLimit.subtract(price)
    const priceDiffPercent = watcher.priceLimit.diffPercent(price)

    return (
      <div style={{ textAlign: 'center' }}>
        <table style={{ width: '600px', margin: '0 auto' }}>
          <tr>
            <td>
              <EmailLowerPriceHeader watcherFullInfo={watcherFullInfo} frontendUrl={frontendUrl} />
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: '#fff' }}>
              <div className="content" style={styles.emailTableContent}>
                <div style={{ ...styles.simpleText, marginBottom: '15px' }}>
                  <Text name={TranslationEnum.EmailContentDescription}>
                    {priceDiff.formatToLocale()}
                    {priceDiffPercent.toString()}
                  </Text>
                </div>
                <div style={{ ...styles.simpleText, marginBottom: '5px' }}>
                  <Text name={TranslationEnum.EmailPricePrefixText} />
                </div>
                <div style={{ fontSize: '25px', lineHeight: '25px', marginBottom: '10px' }}>
                  <Text name={TranslationEnum.EmailPrice}>{price.formatToLocale()}</Text>
                </div>
                <div style={{ ...styles.simpleText, marginBottom: '25px' }}>
                  <Text name={TranslationEnum.EmailPriceSuffixText}>{watcher.priceLimit.formatToLocale()}</Text>
                </div>

                <div style={{ ...styles.simpleText, marginBottom: '10px' }}>
                  <Text name={TranslationEnum.EmailButtonShowResultPrefixText} />
                </div>
                <EmailButton
                  link={resultLink}
                  text={TranslationEnum.EmailButtonShowResult}
                  style={{ marginBottom: '20px' }}
                />

                <WatcherPriceHistory watchersFullInfo={watcherFullInfo} showSvg={showSvg} />

                <div style={{ ...styles.simpleText, marginBottom: '10px', marginTop: '20px' }}>
                  <Text name={TranslationEnum.EmailButtonContinueWatchingPrefixText} />
                </div>
                <EmailButton
                  link={continueLink}
                  text={TranslationEnum.EmailButtonContinueWatching}
                  style={{ marginBottom: '50px' }}
                />
                <div style={{ ...styles.simpleText, marginBottom: '15px' }}>
                  <Text name={TranslationEnum.EmailFooter} />
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    )
  }
}
