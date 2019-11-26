import { createResultUrl, createWatcherLinks } from '@emails/factories/createWatcherLinks'
import { EmailButton } from '@emails/reactComponents/EmailButton'
import { HeaderDestination } from '@emails/reactComponents/HeaderDestination'
import { WatcherPriceHistory } from '@emails/reactComponents/WatcherPriceHistory'
import { AgencyParams } from '@emails/types/AgencyParams'
import { FlightResult } from '@emails/types/FlightResult'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { AppLogicError } from '@shared/errors/AppLogicError'
import { HeaderDates } from '@shared/reactComponents/HeaderDates'
import { Price } from '@shared/reactComponents/Price'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidLanguage } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'

interface Props {
  readonly watchersFullInfoList: WatcherFullInfo[]
  readonly agencyParams: AgencyParams
  readonly showSvg?: boolean
}

const createAdditionalResults = (
  additionalResults: FlightResult[],
  lang: ValidLanguage,
  agencyParams: AgencyParams
) => {
  const additionalResultsLimited = additionalResults.slice(0, 5)

  return (
    <div style={{ textAlign: 'left' }}>
      <br />
      <div style={styles.headerLevel2}>
        <Text name={TranslationEnum.EmailAdditionalResultsHeader} lang={lang} />
      </div>
      {additionalResultsLimited.map((flight: FlightResult, index2: number) => {
        const link = createResultUrl(flight, lang, agencyParams, { flightWatchdogAdditionalResult: '' }).toString()

        return (
          <p key={index2}>
            <a href={link} style={styles.link}>
              <span style={{ fontWeight: 'bold' }}>
                <Price price={flight.price} />
              </span>
              {' - '}
              <HeaderDates departure={flight.departure} arrival={flight.arrival} lang={lang} />
              {' -> '}
              <span style={{ ...styles.buttonLink, fontWeight: 'bold' }}>
                <Text name={TranslationEnum.EmailAdditionalResultsShow} lang={lang} />
              </span>
            </a>
          </p>
        )
      })}
    </div>
  )
}

export class WatchersList extends React.Component<Props> {
  public render() {
    const { watchersFullInfoList, agencyParams, showSvg } = this.props

    if (watchersFullInfoList.length === 0) {
      throw new AppLogicError('Empty watcher list')
    }

    const lang = watchersFullInfoList[0].watcher.lang

    const lines = watchersFullInfoList.map((watcherFullInfo: WatcherFullInfo, index) => {
      const { watcher, additionalResults } = watcherFullInfo
      const { priceLimit } = watcher
      const watcherLinks = createWatcherLinks(watcher, agencyParams)

      return (
        <div key={index}>
          <HeaderDestination watcherFullInfo={watcherFullInfo} lang={lang} showHtml={showSvg} />
          <div style={styles.section3email}>
            <WatcherPriceHistory watchersFullInfo={watcherFullInfo} showSvg={showSvg} />

            <div style={{ ...styles.simpleText, textAlign: 'center' }}>
              <Text name={TranslationEnum.EmailPriceLimit} lang={lang}>
                {priceLimit.toString()}
              </Text>
            </div>

            <br />

            <table
              cellSpacing="0"
              cellPadding="0"
              style={{ textAlign: 'center', background: styles.primaryBackgroundColor, width: '600px' }}
            >
              <tr>
                <td>
                  <table cellSpacing="0" cellPadding="0" style={{ textAlign: 'center', margin: '0px auto' }}>
                    <tr>
                      <td />
                      <td style={{ background: styles.buttonColor }}>
                        <EmailButton
                          link={watcherLinks.resultLink}
                          text={TranslationEnum.EmailButtonShowResult}
                          lang={lang}
                        />
                      </td>
                      <td>&nbsp;</td>
                      <td style={{ background: styles.buttonColor }}>
                        <EmailButton
                          link={watcherLinks.deleteLink}
                          text={TranslationEnum.EmailButtonDelete}
                          lang={lang}
                        />
                      </td>
                      <td />
                    </tr>
                  </table>
                </td>
              </tr>
              <tr style={{ height: '10px' }}>
                <td />
              </tr>
            </table>

            <table
              cellSpacing="0"
              cellPadding="0"
              style={{ textAlign: 'center', background: styles.primaryBackgroundColor, width: '600px' }}
            >
              <tr>
                <td style={{ width: '10px' }} />
                <td>
                  {additionalResults.length !== 0 && createAdditionalResults(additionalResults, lang, agencyParams)}
                </td>
              </tr>
              <tr style={{ height: '10px' }}>
                <td />
                <td />
              </tr>
            </table>
          </div>
        </div>
      )
    })

    return <React.Fragment>{lines}</React.Fragment>
  }
}
