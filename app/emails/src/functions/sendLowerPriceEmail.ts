import { createLowerPriceEmailRaw } from '@emails/factories/lowerPriceEmailFactory'
import { AgencyParams } from '@emails/types/AgencyParams'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { ValidPrice } from '@travelport-czech/valid-objects-ts'
import { SupportedLanguageEnum } from '@shared/translation/SupportedLanguageEnum'
import { AppLogicError } from '@shared/errors/AppLogicError'

/**
 * Do not delete this function!
 *
 * Is used by backend server
 */
export const sendLowerPriceEmail = async (
  sendEmail: (content: string) => Promise<void>,
  createImage: (html: string, width: number, height: number) => Promise<string>,
  watcherFullInfo: WatcherFullInfo,
  lang: string,
  agencyParams: AgencyParams,
  price: ValidPrice
) => {
  const validatedLang = SupportedLanguageEnum[lang]
  if (!validatedLang) {
    throw new AppLogicError(`Not supported language ${lang}`)
  }

  const emailContent = await createLowerPriceEmailRaw(createImage, watcherFullInfo, validatedLang, agencyParams, price)

  await sendEmail(emailContent)
}
