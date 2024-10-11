import { AgencyParams } from '@emails/types/AgencyParams'
import { FlightParams } from '@emails/types/FlightParams'
import { WatcherLinks } from '@emails/types/WatcherLinks'
import { WatcherParams } from '@emails/types/WatcherParams'
import { AppLogicError } from '@shared/errors/AppLogicError'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import { urlParamsConst } from '@shared/utils/consts'

const langCodeMapToGolLangCode = {
    [SupportedLanguageEnum.cs]: 'cs',
    [SupportedLanguageEnum.en]: 'en',
    [SupportedLanguageEnum.al]: 'al',
    [SupportedLanguageEnum.sk]: 'sk',
    [SupportedLanguageEnum.vi]: 'vi',
    [SupportedLanguageEnum.sr]: 'sr',
}

export const createResultUrl = (
    flight: FlightParams,
    lang: string,
    agencyParams: AgencyParams,
    addParams: { readonly [key: string]: string },
): string => {
    const validatedLang = SupportedLanguageEnum[lang]
    if (!validatedLang) {
        throw new AppLogicError(`Not supported language ${lang}`)
    }

    const { dealerId, frontendUrl } = agencyParams
    const dealerIdUrlPart = dealerId ? '&dealer_id=' + dealerId.toString() : ''

    const addParamsPart = Object.entries(addParams).map((item) => {
        return `&${item[0]}=${item[1]}`
    })

    return frontendUrl.toString() + createResultLink(flight, validatedLang) + dealerIdUrlPart + addParamsPart.join('')
}

const createResultLink = (flight: FlightParams, lang: SupportedLanguageEnum): string => {
    const onewayParams = `/results?\
departureDate=${flight.departure.formatToSystem()}\
&to=${flight.destination.toString()}\
&from=${encodeURIComponent(flight.origin.toString())}\
&lang=${langCodeMapToGolLangCode[lang.toString()]}\
&ADT=1\
&toleranceDays=0`

    if (flight.flightType === 'return') {
        if (!flight.arrival) {
            throw new AppLogicError('Missing arrival for return flight')
        }

        return `${onewayParams}&returnDate=${flight.arrival.formatToSystem()}`
    }

    if (flight.flightType === 'oneway') {
        return onewayParams
    }

    throw new AppLogicError('Bad flight type')
}

export const createWatcherLinks = (
    watcher: WatcherParams,
    agencyParams: AgencyParams,
    lang: SupportedLanguageEnum,
): WatcherLinks => {
    const { dealerId, frontendUrl } = agencyParams
    const dealerIdUrlPart = dealerId ? '&dealer_id=' + dealerId.toString() : ''
    const resultLinkString = frontendUrl + createResultLink(watcher, lang) + dealerIdUrlPart

    const resultLink = `${resultLinkString}&${urlParamsConst.result}=`

    const continueLink = `${resultLinkString}&${urlParamsConst.continue}=${encodeURIComponent(
        watcher.email.toString(),
    )}`

    return {
        continueLink,
        frontendUrl,
        resultLink,
    }
}
