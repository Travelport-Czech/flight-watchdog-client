import { TranslationKeys } from '@shared/translation/TranslationKeys'

// tslint:disable:max-line-length
export const enTranslation: TranslationKeys = {
    FormatDate: `D MMM YYYY`,
    FormatDateDayMonth: `D MMM`,
    FormatDateWithDayName: `ddd D MMM YYYY`,
    ClientButtonCreate: `Track`,
    ClientButtonNotInterested: `Not interested`,
    ClientBadEmailError: `Email does not have the correct format`,
    ClientButtonOk: `OK`,
    ClientButtonYes: `Yes`,
    ClientButtonClose: `Close`,
    ClientMessageCreateWatcherDone: `Done. When we find a lower price, we will send you an email.`,
    ClientMessageCreateWatcherWorking: `I'm creating a record with a new tracking, please wait...`,
    ClientMessageDeleteWatcherWorking: `I'm deleting a record with the watcher, please wait...`,
    ClientMessageError: `Ooops, something went wrong.`,
    ClientMessageWatcherDeleteById: `Do you want to delete the watcher?`,
    ClientMessageContinueWatching: `Do you want to keep tracking the price of this flight?`,
    ClientMessageWatcherAlreadyExists: `There is already one flight tracking for this email. Do you want to delete it and create a tracking?`,
    ClientMessageMoreWatchersAlreadyExists: `You have reached the limit of flight trackings for this email. If you want to track this flight, you have to delete one of the existing trackings. A list of trackings has been sent to your email and you can edit it.`,
    ClientMessageMinimalizedWindow: `Looking for a cheaper flight? Click here.`,
    ClientInputEmailPlaceholder: `enter your email...`,
    ClientTitle: `Track the price {?}?`,
    ClientDestinationsReturn: `from{_}{?} to{_}{?} and{_}back`,
    ClientDestinationsOneway: `from{_}{?} to{_}{?}`,
    ClientDescription: `We'll track it for you! And you'll get an update on its development every day.`,
    ClientDatesReturn: `{?} until {?}`,
    ClientDatesOneway: `{?}`,
    EmailTitle: `We found a better price for the flight you had searched!`,
    EmailLowerPriceSubject: `We found a better price for the flight {?} - {?}`,
    EmailDescription: `Based on your lower price alert from the website {?}, this email was sent immediately after we found a lower price.`,
    EmailContentDescription: `We found a price lower by {?}, which is {?} % less.`,
    EmailPricePrefixText: `The found price is`,
    EmailPriceSuffixText: `The original price was {?}`,
    EmailPrice: `{?}`,
    EmailPriceLimit: `The price limit is {?}`,
    EmailButtonShowResultPrefixText: `Click the button below to view the flight on the web:`,
    EmailButtonShowResult: `Book`,
    EmailButtonContinueWatchingPrefixText: `Important: Flight tracking is stopped once we find a lower price. If you want to keep tracking the price, please confirm here:`,
    EmailButtonContinueWatching: `Continue tracking`,
    EmailButtonDelete: `Stop watching`,
    EmailFooter: `Provided by Flight Watchdog.`,
    EmailWatcherListHeader: `List of your flight watchdogs`,
    EmailWatcherListDescription: `This email was sent to you based on your request to delete the flight watcher on {?}. When you click Delete, you will be redirected to flight search results and you will be prompted to delete the flight.`,
    EmailMarketingHeader: `Flight prices trends`,
    EmailMarketingDescription: `This email is sent to you daily based on your request to track flight prices on {?}.`,
    EmailNoReplyName: `Flight watchdog`,
    EmailAdditionalResultsHeader: `Similar offers (people just buying)`,
    EmailAdditionalResultsShow: `Show`,
    GraphLegendPriceLimit: `Tracked price`,
    GraphLegendPriceTrend: `Price trend`,
    PageTokenNotValid: `Link validity has expired.`,
    PageWatcherDeletedSuccess: `Flight tracking has been cancel.`,
    PageContinueToWeb: `Click to continue to {?}`,
}
