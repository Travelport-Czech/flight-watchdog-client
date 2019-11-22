import { createWatcherLinks } from '@emails/factories/createWatcherLinks'
import { EmailButton } from '@emails/reactComponents/EmailButton'
import { EmailLowerPriceSection1 } from '@emails/reactComponents/EmailLowerPriceSection1'
import { HeaderDestination } from '@emails/reactComponents/HeaderDestination'
import { WatcherPriceHistory } from '@emails/reactComponents/WatcherPriceHistory'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { Price } from '@shared/reactComponents/Price'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidPrice } from '@travelport-czech/valid-objects-ts'
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
    const { lang, priceLimit } = watcher
    const watcherLinks = createWatcherLinks(watcher, agencyParams)
    const { resultLink, continueLink, frontendUrl } = watcherLinks

    const priceDiff = priceLimit.subtract(price)
    const priceDiffPercent = priceLimit.diffPercent(price)

    return (
      <div style={{ textAlign: 'center' }}>
        <table
          cellSpacing="0"
          cellPadding="0"
          style={{ width: '600px', textAlign: 'center', margin: '0 auto', background: styles.primaryBackgroundColor }}
        >
          <tr>
            <td>
              <EmailLowerPriceSection1 lang={lang} showHtml={showSvg} />
              <HeaderDestination watcherFullInfo={watcherFullInfo} lang={lang} showHtml={showSvg} />
            </td>
          </tr>
          <tr>
            <td>
              <table cellSpacing="0" cellPadding="0">
                <td>
                  <div style={styles.section3email}>
                    <div style={styles.headerTextDescription}>
                      <table>
                        <tr>
                          <td style={{ width: '10px' }} />
                          <td>
                            <Text name={TranslationEnum.EmailDescription} lang={lang}>
                              <a href={frontendUrl.toString()}>{frontendUrl.toString()}</a>
                            </Text>
                          </td>
                          <td style={{ width: '10px' }} />
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div style={{ ...styles.section3email, textAlign: 'center' }}>
                    <div style={{ ...styles.simpleText, marginBottom: '15px' }}>
                      <Text name={TranslationEnum.EmailContentDescription} lang={lang}>
                        <Price price={priceDiff} />
                        {priceDiffPercent.toString()}
                      </Text>
                    </div>
                    <div style={{ ...styles.simpleText, marginBottom: '5px' }}>
                      <Text name={TranslationEnum.EmailPricePrefixText} lang={lang} />
                    </div>
                    <div style={{ fontSize: '25px', lineHeight: '25px', marginBottom: '10px' }}>
                      <Text name={TranslationEnum.EmailPrice} lang={lang}>
                        <Price price={price} />
                      </Text>
                    </div>
                    <div style={{ ...styles.simpleText, marginBottom: '25px' }}>
                      <Text name={TranslationEnum.EmailPriceSuffixText} lang={lang}>
                        <Price price={watcher.priceLimit} />
                      </Text>
                    </div>

                    <div style={{ ...styles.simpleText, marginBottom: '10px' }}>
                      <Text name={TranslationEnum.EmailButtonShowResultPrefixText} lang={lang} />
                    </div>
                    <table cellSpacing="0" cellPadding="0" style={{ textAlign: 'center', margin: '0px auto' }}>
                      <tr>
                        <td style={{ background: styles.buttonColor }}>
                          <EmailButton
                            link={resultLink}
                            text={TranslationEnum.EmailButtonShowResult}
                            style={{ marginBottom: '20px' }}
                            lang={lang}
                          />
                        </td>
                      </tr>
                    </table>

                    <br />

                    <WatcherPriceHistory watchersFullInfo={watcherFullInfo} showSvg={showSvg} />

                    <div style={{ ...styles.simpleText, marginBottom: '10px', marginTop: '20px' }}>
                      <Text name={TranslationEnum.EmailButtonContinueWatchingPrefixText} lang={lang} />
                    </div>

                    <table cellSpacing="0" cellPadding="0" style={{ textAlign: 'center', margin: '0px auto' }}>
                      <tr>
                        <td style={{ background: styles.buttonColor }}>
                          <EmailButton
                            link={continueLink}
                            text={TranslationEnum.EmailButtonContinueWatching}
                            style={{ marginBottom: '50px' }}
                            lang={lang}
                          />
                        </td>
                      </tr>
                    </table>

                    <br />

                    <div style={{ ...styles.simpleText, marginBottom: '15px' }}>
                      <Text name={TranslationEnum.EmailFooter} lang={lang} />
                    </div>
                  </div>
                </td>
              </table>
            </td>
          </tr>
        </table>
      </div>
    )
  }
}
