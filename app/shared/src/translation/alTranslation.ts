import { TranslationEnum as T } from '@shared/translation/TranslationEnum'
import { TranslationKeys } from '@shared/translation/TranslationKeys'

// tslint:disable:max-line-length
export const alTranslation: TranslationKeys = {
  [T.FormatDate]: `D/MM/YYYY`,
  [T.FormatDateDayMonth]: `D/MM`,
  [T.FormatDateWithDayName]: `ddd D MMM YYYY`,
  [T.ClientButtonCreate]: `Gjurmo`,
  [T.ClientButtonNotInterested]: `Nuk jam I interesuar`,
  [T.ClientBadEmailError]: `Adresa e-mail nuk ka formatin e duhur`,
  [T.ClientButtonOk]: `OK`,
  [T.ClientButtonYes]: `Po`,
  [T.ClientButtonClose]: `Mbyll`,
  [T.ClientMessageCreateWatcherDone]: `U kry. Kur të kemi një cmim më të lirë, do njoftoheni në e-mail.`,
  [T.ClientMessageCreateWatcherWorking]: `Po krijohet një gjurmim I ri, ju lutem prisni... `,
  [T.ClientMessageDeleteWatcherWorking]: `Po fshihet gjurmimi vjetër, ju lutem prisni…`,
  [T.ClientMessageError]: `Ooops, diçka nuk shkoi mirë.`,
  [T.ClientMessageWatcherDeleteById]: `A doni të fshini vrojtuesin?`,
  [T.ClientMessageContinueWatching]: `A doni të vazhdoni gjurmimin e çmimit të këtij fluturimi?`,
  [T.ClientMessageWatcherAlreadyExists]: `Ekziston një gjurmim çmimi për këtë e-mail. A doni ta fshini dhe të krijoni një gjurmim të ri?`,
  [T.ClientMessageMoreWatchersAlreadyExists]: `Ju keni arritur maksimumin e gjurmimeve të fluturimeve për këtë e-mail. Nëqoftëse doni të gjurmoni çmimin e këtij fluturimi, duhet të fshini një nga gjurmimet ekzistuese. Një listë e gjurmimeve është dërguar në adresën tuaj të e-mail, nga ku mund të ndryshoni.  `,
  [T.ClientMessageMinimalizedWindow]: `Po kërkoni një fluturim më të lirë? Klikoni këtu.`,
  [T.ClientInputEmailPlaceholder]: `Vendosni e-mail tuaj…`,
  [T.ClientTitle]: `Gjurmo çmimin {?}?`,
  [T.ClientDestinationsReturn]: `from{_}{?} to{_}{?} and{_}back`,
  [T.ClientDestinationsOneway]: `from{_}{?} to{_}{?}`,
  [T.ClientDescription]: `Ne do e gjurmojmë për ju! Dhe do njoftoheni për pë rditesimet e  çdo dite.`,
  [T.ClientDatesReturn]: `{?} deri {?}`,
  [T.ClientDatesOneway]: `{?}`,
  [T.EmailTitle]: `Ku kemi gjetur një çmim më të mirë për fluturimin që keni kërkuar!`,
  [T.EmailLowerPriceSubject]: `Ju kemi gjetur një çmim më të mirë për fluturimin {?} - {?}`,
  [T.EmailDescription]: `Bazuar në njoftimet për çmimet më të lira prej faqes web {?}, ky e-mail është dërguar menjëherë sapo u gjet një çmim më I lirë.`,
  [T.EmailContentDescription]: `Ne kemi gjetur një çmim më të lirë prej {?}, I cili është {?} % më pak. `,
  [T.EmailPricePrefixText]: `{?}`,
  [T.EmailPriceSuffixText]: `Çmimi origjinal ishte {?}`,
  [T.EmailPrice]: `{?}`,
  [T.EmailPriceLimit]: `Limiti i çmimit është {?}`,
  [T.EmailButtonShowResultPrefixText]: `Prenoto`,
  [T.EmailButtonShowResult]: `Book`,
  [T.EmailButtonContinueWatchingPrefixText]: `Vazhdo gjurmimin`,
  [T.EmailButtonContinueWatching]: `Continue tracking`,
  [T.EmailButtonDelete]: `Ndalo gjurmimin`,
  [T.EmailFooter]: `Siguruar nga Flight Watchdog.`,
  [T.EmailWatcherListHeader]: `Lista e vrojtuesve tuaj të fluturimeve`,
  [T.EmailWatcherListDescription]: `Ky e-mail ju është dërguar bazuar në kërkesën tuaj për të fshirë gjurmimin e fluturimit tek {?}. Kur të klikoni Fshi, do të ridrejtoheni në rezultatet e kërkimit të fluturimit dhe do t'ju kërkohet të fshihni fluturimin.`,
  [T.EmailMarketingHeader]: `Trendet e çmimeve të fluturimeve`,
  [T.EmailMarketingDescription]: `Ky e-mail ju dërgohet çdo ditë bazuar në kërkesën tuaj për të ndjekur çmimet e fluturimeve tek {?}`,
  [T.EmailNoReplyName]: `Flight Watchdog`,
  [T.EmailAdditionalResultsHeader]: `Oferta të ngjashme`,
  [T.EmailAdditionalResultsShow]: `Shfaq`,
  [T.GraphLegendPriceLimit]: `Çmimi gjurmuar`,
  [T.GraphLegendPriceTrend]: `Trendi çmimit`,
  [T.PageTokenNotValid]: `Vlefshmëria e lidhjes ka skaduar.`,
  [T.PageWatcherDeletedSuccess]: `Gjurmimi i fluturimit është anulluar.`,
  [T.PageContinueToWeb]: `Kliko për të vazhduar tek {?}`
}