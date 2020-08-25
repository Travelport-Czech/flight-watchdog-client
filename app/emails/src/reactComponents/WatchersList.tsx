import { createResultUrl, createWatcherLinks } from '@emails/factories/createWatcherLinks'
import { EmailButton } from '@emails/reactComponents/EmailButton'
import { WatcherPriceHistory } from '@emails/reactComponents/WatcherPriceHistory'
import { AgencyParams } from '@emails/types/AgencyParams'
import { FlightResult } from '@emails/types/FlightResult'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { AppLogicError } from '@shared/errors/AppLogicError'
import { HeaderDates } from '@shared/reactComponents/HeaderDates'
import { LocationNameList } from '@shared/reactComponents/LocationNameList'
import { Price } from '@shared/reactComponents/Price'
import * as styles from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidLanguage, ValidUrl } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'

interface Props {
  readonly watchersFullInfoList: WatcherFullInfo[]
  readonly agencyParams: AgencyParams
  readonly showSvg?: boolean
  readonly linksToDeleteMap: Map<string, ValidUrl>
}

const createAdditionalResults = (
  additionalResults: FlightResult[],
  lang: ValidLanguage,
  agencyParams: AgencyParams
) => {
  const additionalResultsLimited = additionalResults.slice(0, 5)

  return (
    <div style={{ marginTop: '20px' }}>
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
    const { watchersFullInfoList, agencyParams, showSvg, linksToDeleteMap } = this.props

    if (watchersFullInfoList.length === 0) {
      throw new AppLogicError('Empty watcher list')
    }

    const lang = watchersFullInfoList[0].watcher.lang

    const lines = watchersFullInfoList.map((watchersFullInfo: WatcherFullInfo, index) => {
      const { watcher, originLocationList, destinationLocationList, additionalResults } = watchersFullInfo
      const { priceLimit, departure, arrival } = watcher
      const watcherLinks = createWatcherLinks(watcher, agencyParams)
      const destinationTextKey =
        watcher.flightType === 'return'
          ? TranslationEnum.ClientDestinationsReturn
          : TranslationEnum.ClientDestinationsOneway

      const linkToDelete = linksToDeleteMap.get(watcher.id.toString())
      if (!linkToDelete) {
        throw new AppLogicError('Missing link to delete in Map.')
      }

      return (
        <div key={index} style={styles.emailBlock}>
          <div style={styles.headerLevel2}>
            <Text name={destinationTextKey} lang={lang}>
              <span style={styles.primaryColor}>
                <LocationNameList locationList={originLocationList} />
              </span>
              <span style={styles.primaryColor}>
                <LocationNameList locationList={destinationLocationList} />
              </span>
            </Text>
          </div>
          <div style={styles.headerDates}>
            <HeaderDates departure={departure} arrival={arrival} lang={lang} />
          </div>

          <WatcherPriceHistory watchersFullInfo={watchersFullInfo} showSvg={showSvg} />

          <div style={styles.simpleText}>
            <Text name={TranslationEnum.EmailPriceLimit} lang={lang}>
              {priceLimit.toString()}
            </Text>
          </div>

          <table>
            <tr>
              <td>
                <EmailButton
                  link={watcherLinks.resultLink}
                  text={TranslationEnum.EmailButtonShowResult}
                  lang={lang}
                  name="reserve"
                />
              </td>
              <td>
                <EmailButton
                  link={linkToDelete}
                  text={TranslationEnum.EmailButtonDelete}
                  lang={lang}
                  name="delete"
                  style={{
                    width: 'auto',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 'normal',
                    textDecoration: 'underline',
                  }}
                />
              </td>
            </tr>
          </table>

          {additionalResults.length !== 0 && createAdditionalResults(additionalResults, lang, agencyParams)}
        </div>
      )
    })

    return <React.Fragment>{lines}</React.Fragment>
  }
}
