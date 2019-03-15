import { AppLogicError } from 'src/errors/AppLogicError'
import { StepToShow } from 'src/StepsToShow'
import { ClientSettings } from 'src/types/ClientSettings'
import { UnknownNestedObject } from 'src/types/UnknownNestedObject'
import { WatcherClientCreateParams } from 'src/types/WatcherClientCreateParams'
import { createAuthorizationBasicToken } from 'src/utils/createAuthorizationBasicToken'
import { parseJson } from 'src/utils/parseJson'
import { Location } from 'src/validObjects/Location'
import { ValidEmail } from 'src/validObjects/ValidEmail'
import { ValidLanguage } from 'src/validObjects/ValidLanguage'
import { ValidLocationCode } from 'src/validObjects/ValidLocationCode'
import { ValidLocationCodeList } from 'src/validObjects/ValidLocationCodeList'
import { ValidNumber } from 'src/validObjects/ValidNumber'
import { ValidString } from 'src/validObjects/ValidString'
import { ValidWatcherId } from 'src/validObjects/ValidWatcherId'

const apiUrl: string | undefined = process.env.API_URL

if (!apiUrl) {
  throw new AppLogicError('Missing queue url')
}

enum ResponseKeysEnum {
  Count = 'count',
  Limit = 'limit',
  EmailContent = 'emailContent',
  EmailLimit = 'emailLimit'
}

export const isAllowedToAddWatcher = async (token: string): Promise<boolean> => {
  const json = await sendRequest(token, '/client/count-all', {})
  if (json.result !== 'Success') {
    return false
  }

  if (!json.context) {
    return false
  }

  const count = new ValidNumber(json.context[ResponseKeysEnum.Count])
  const limit = new ValidNumber(json.context[ResponseKeysEnum.Limit])

  if (count.value >= limit.value) {
    return false
  }

  return true
}

export const getEmailExample = async (token: string, lang: ValidLanguage, name: ValidString): Promise<string> => {
  const json = await sendRequest(token, '/client/email-example', { lang: lang.toString(), name: name.toString() })
  if (json.result !== 'Success') {
    return ''
  }

  if (!json.context) {
    return ''
  }

  const content = new ValidString(json.context[ResponseKeysEnum.EmailContent])

  return content.toString()
}

export const getDestinationNames = async (
  token: string,
  locationCodeList: ValidLocationCodeList,
  lang: ValidLanguage
): Promise<Location[]> => {
  const json = await sendRequest(token, '/client/destination-name', {
    lang: lang.toString(),
    locationCode: locationCodeList.toString()
  })
  if (json.result !== 'Success') {
    return []
  }

  if (!json.context) {
    throw new Error('Flight Watchdog: Bad api response')
  }

  if (!Array.isArray(json.context)) {
    throw new Error('Flight Watchdog: Bad api response')
  }

  return json.context.map(
    (item: UnknownNestedObject): Location => {
      return {
        code: new ValidLocationCode(item.code),
        name: item.name ? new ValidString(item.name).toString() : undefined
      }
    }
  )
}

export const getWatchersCountOnEmail = async (
  token: string,
  email: string
): Promise<{ readonly limit: number; readonly count: number } | undefined> => {
  const json = await sendRequest(token, '/client/count', { email })
  if (json.result !== 'Success') {
    return
  }

  if (!json.context) {
    throw new Error('Flight Watchdog: Bad api response')
  }

  const count = new ValidNumber(json.context[ResponseKeysEnum.Count])
  const limit = new ValidNumber(json.context[ResponseKeysEnum.EmailLimit])

  return {
    count: count.value,
    limit: limit.value
  }
}

export const getWatchersOnEmail = async (token: string, email: ValidEmail): Promise<ValidWatcherId[] | undefined> => {
  const json = await sendRequest(token, '/client/detail', { email: email.toString() })
  if (json.result !== 'Success') {
    return
  }

  if (!json.context) {
    throw new Error('Flight Watchdog: Bad api response')
  }

  if (!Array.isArray(json.context)) {
    throw new Error('Flight Watchdog: Bad api response')
  }

  return json.context.map((item: UnknownNestedObject) => {
    return new ValidWatcherId(item.id)
  })
}

export const createWatcher = async (token: string, data: WatcherClientCreateParams): Promise<boolean> => {
  try {
    const json = await sendRequest(token, '/client/create', { ...data })
    if (json.result !== 'Success') {
      return false
    }
  } catch (err) {
    return false
  }

  return true
}

export const sendWatchersList = async (token: string, email: string, lang: ValidLanguage): Promise<boolean> => {
  try {
    const json = await sendRequest(token, '/client/send-watcher-list', { email, lang: lang.toString() })
    if (json.result !== 'Success') {
      return false
    }
  } catch (err) {
    return false
  }

  return true
}

export const deleteWatcher = async (token: string, id: ValidWatcherId, email: ValidEmail): Promise<boolean> => {
  try {
    const json = await sendRequest(token, '/client/delete', { id: id.toString(), email: email.toString() })
    if (json.result !== 'Success') {
      return false
    }
  } catch (err) {
    return false
  }

  return true
}

export const sendRequest = async (
  token: string,
  url: string,
  data: UnknownNestedObject
): Promise<UnknownNestedObject> => {
  const endpoint = apiUrl + url
  const response = await fetch(endpoint, {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      authorization: createAuthorizationBasicToken('', token)
    },
    method: 'POST'
  })

  return parseJson(await response.text())
}

// tslint:disable-next-line:no-any
export const isValidClientSettings = (data: any): ClientSettings => {
  if (!data) {
    throw new Error('Flight Watchdog: Missing settings')
  }
  // tslint:disable-next-line:no-unsafe-any
  const token = new ValidString(data.token)
  // tslint:disable-next-line:no-unsafe-any
  const keepMinimalisedInDays = new ValidNumber(
    // tslint:disable-next-line:no-unsafe-any
    typeof data.keepMinimalisedInDays === 'number' ? data.keepMinimalisedInDays : 7
  )

  if (!Object.values(StepToShow).includes(data.initStep)) {
    throw new Error('Flight Watchdog: Bad init step')
  }

  return {
    keepMinimalisedInDays,
    token: token.toString(),
    initStep: data.initStep
  }
}
