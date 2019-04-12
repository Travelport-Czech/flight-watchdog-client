import { ValidUrl } from '@ceesystems/valid-objects-ts'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherLinks } from '@emails/types/WatcherLinks'
import { WatcherParams } from '@emails/types/WatcherParams'
import { AppLogicError } from '@shared/errors/AppLogicError'

const createResultLink = (watcher: WatcherParams): string => {
  if (watcher.flightType === 'return') {
    if (!watcher.arrival) {
      throw new AppLogicError('Missing arrival for return flight')
    }

    return `/booking/api/search/v3?\
id_dealer=10\
&client_encoding=utf-8\
&lang=cs\
&id=airticket\
&ui_formtype=round_trip\
&arrival_destination_1_short=${encodeURIComponent(watcher.destination.toString())}\
&arrival_destination_1=${encodeURIComponent(watcher.destination.toString())}\
&departure_destination_1_short=${encodeURIComponent(watcher.origin.toString())}\
&departure_destination_1=${encodeURIComponent(watcher.origin.toString())}\
&departure_date_1=${watcher.departure.formatToSystem()}\
&departure_date_2=${watcher.arrival.formatToSystem()}\
&passengers_adt=1\
`
  }

  if (watcher.flightType === 'oneway') {
    return `/booking/api/search/v3?\
id_dealer=10\
&client_encoding=utf-8\
&lang=cs\
&id=airticket\
&ui_formtype=oneway\
&arrival_destination_1_short=${encodeURIComponent(watcher.destination.toString())}\
&arrival_destination_1=${encodeURIComponent(watcher.destination.toString())}\
&departure_destination_1_short=${encodeURIComponent(watcher.origin.toString())}\
&departure_destination_1=${encodeURIComponent(watcher.origin.toString())}\
&departure_date_1=${watcher.departure.formatToSystem()}\
&passengers_adt=1\
`
  }

  throw new AppLogicError('Bad flight type')
}

export const createWatcherLinks = (watcher: WatcherParams, agencyParams: AgencyParams): WatcherLinks => {
  const { dealerId, frontendUrl } = agencyParams
  const dealerIdUrlPart = dealerId ? '&dealer_id=' + dealerId.toString() : ''
  const resultLinkString = frontendUrl.toString() + createResultLink(watcher) + dealerIdUrlPart

  const resultLink = new ValidUrl(resultLinkString + '&flightWatchdogResult=')

  const continueLink = new ValidUrl(
    resultLinkString + '&flightWatchdogContinue=' + encodeURIComponent(watcher.email.toString())
  )

  const deleteLink = new ValidUrl(
    resultLinkString +
      '&flightWatchdogDelete=' +
      encodeURIComponent(watcher.id.toString()) +
      '&email=' +
      encodeURIComponent(watcher.email.toString())
  )

  return {
    continueLink,
    deleteLink,
    frontendUrl,
    resultLink
  }
}
