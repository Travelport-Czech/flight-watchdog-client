import { TranslationEnum as T } from '@shared/translation/TranslationEnum'
import { TranslationKeysBase } from '@travelport-czech/ss-translations'

export interface TranslationKeys extends TranslationKeysBase {
    readonly [T.FormatDate]: string
    readonly [T.FormatDateDayMonth]: string
    readonly [T.FormatDateWithDayName]: string
    readonly [T.ClientButtonCreate]: string
    readonly [T.ClientButtonNotInterested]: string
    readonly [T.ClientBadEmailError]: string
    readonly [T.ClientMessageCreateWatcherDone]: string
    readonly [T.ClientButtonOk]: string
    readonly [T.ClientButtonYes]: string
    readonly [T.ClientButtonClose]: string
    readonly [T.ClientMessageCreateWatcherWorking]: string
    readonly [T.ClientMessageDeleteWatcherWorking]: string
    readonly [T.ClientMessageError]: string
    readonly [T.ClientMessageContinueWatching]: string
    readonly [T.ClientMessageWatcherAlreadyExists]: string
    readonly [T.ClientMessageWatcherDeleteById]: string
    readonly [T.ClientMessageMoreWatchersAlreadyExists]: string
    readonly [T.ClientMessageMinimalizedWindow]: string
    readonly [T.ClientInputEmailPlaceholder]: string
    readonly [T.ClientTitle]: string
    readonly [T.ClientDestinationsReturn]: string
    readonly [T.ClientDestinationsOneway]: string
    readonly [T.ClientDescription]: string
    readonly [T.ClientDatesReturn]: string
    readonly [T.ClientDatesOneway]: string
    readonly [T.EmailTitle]: string
    readonly [T.EmailLowerPriceSubject]: string
    readonly [T.EmailDescription]: string
    readonly [T.EmailContentDescription]: string
    readonly [T.EmailPricePrefixText]: string
    readonly [T.EmailPriceSuffixText]: string
    readonly [T.EmailPrice]: string
    readonly [T.EmailPriceLimit]: string
    readonly [T.EmailButtonShowResultPrefixText]: string
    readonly [T.EmailButtonShowResult]: string
    readonly [T.EmailButtonContinueWatchingPrefixText]: string
    readonly [T.EmailButtonContinueWatching]: string
    readonly [T.EmailButtonDelete]: string
    readonly [T.EmailFooter]: string
    readonly [T.EmailWatcherListHeader]: string
    readonly [T.EmailWatcherListDescription]: string
    readonly [T.EmailMarketingHeader]: string
    readonly [T.EmailMarketingDescription]: string
    readonly [T.EmailNoReplyName]: string
    readonly [T.EmailAdditionalResultsHeader]: string
    readonly [T.EmailAdditionalResultsShow]: string
    readonly [T.GraphLegendPriceLimit]: string
    readonly [T.GraphLegendPriceTrend]: string
    readonly [T.PageTokenNotValid]: string
    readonly [T.PageContinueToWeb]: string
    readonly [T.PageWatcherDeletedSuccess]: string
}
