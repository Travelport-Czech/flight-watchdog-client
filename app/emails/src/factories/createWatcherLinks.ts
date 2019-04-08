import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherLinks } from '@emails/types/WatcherLinks'
import { WatcherParams } from '@emails/types/WatcherParams'
import { AppLogicError } from '@shared/errors/AppLogicError'
import { ValidUrl } from '@shared/validObjects/ValidUrl'

const createResultLink = (watcher: WatcherParams): string => {
  if (watcher.flightType.isReturn()) {
    if (!watcher.arrival) {
      throw new AppLogicError('Missing arrival for return flight')
    }

    return `/index.php?action=vFlights\
&flights[0][departureDate]=${watcher.departure.formatToSystem()}\
&flights[0][destination]=${watcher.destination.toString()}\
&flights[0][origin]=${encodeURIComponent(watcher.origin.toString())}\
&flights[1][departureDate]=${watcher.arrival.formatToSystem()}\
&flights[1][destination]=${watcher.origin.toString()}\
&flights[1][origin]=${watcher.destination.toString()}\
&travelers[0]=ADT\
&returnTicket=on\
&dateVariants=exact\
&step=ChooseFromFour`
  }

  if (watcher.flightType.isOneway()) {
    return `/index.php?action=vFlights\
&flights[0][departureDate]=${watcher.departure.formatToSystem()}\
&flights[0][destination]=${watcher.destination.toString()}\
&flights[0][origin]=${encodeURIComponent(watcher.origin.toString())}\
&travelers[0]=ADT\
&returnTicket=\
&dateVariants=exact\
&step=ChooseFromFour`
  }

  throw new AppLogicError('Bad flight type')
}

export const createWatcherLinks = (watcher: WatcherParams, agencyParams: AgencyParams): WatcherLinks => {
  const { dealerId, frontendUrl } = agencyParams
  const waitPageString = `${frontendUrl.toString()}/index.php?action=vWait&redirect=`
  const dealerIdUrlPart = dealerId ? '&dealer_id=' + dealerId.toString() : ''
  const resultLinkString = frontendUrl.toString() + createResultLink(watcher) + dealerIdUrlPart

  const resultLink = new ValidUrl(waitPageString + encodeURIComponent(resultLinkString) + '&flightWatchdogResult=')

  const continueLink = new ValidUrl(
    waitPageString +
      encodeURIComponent(resultLinkString + '&flightWatchdogContinue=' + encodeURIComponent(watcher.email.toString()))
  )

  const deleteLink = new ValidUrl(
    waitPageString +
      encodeURIComponent(
        resultLinkString +
          '&flightWatchdogDelete=' +
          encodeURIComponent(watcher.id.toString()) +
          '&email=' +
          encodeURIComponent(watcher.email.toString())
      )
  )

  return {
    continueLink,
    deleteLink,
    frontendUrl,
    resultLink
  }
}
