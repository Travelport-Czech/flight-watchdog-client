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

enum ResponseKeysEnum {
  Count = 'count',
  Limit = 'limit',
  EmailContent = 'emailContent',
  EmailLimit = 'emailLimit'
}

export const isAllowedToAddWatcher = async (token: string, apiUrl: ValidString): Promise<boolean> => {
  const json = await sendRequest(token, apiUrl, '/client/count-all', {})
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

export const getEmailExample = async (
  token: string,
  apiUrl: ValidString,
  lang: ValidLanguage,
  name: ValidString
): Promise<string> => {
  const json = await sendRequest(token, apiUrl, '/client/email-example', {
    lang: lang.toString(),
    name: name.toString()
  })
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
  apiUrl: ValidString,
  locationCodeList: ValidLocationCodeList,
  lang: ValidLanguage
): Promise<Location[]> => {
  const json = await sendRequest(token, apiUrl, '/client/destination-name', {
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
  apiUrl: ValidString,
  email: string
): Promise<{ readonly limit: number; readonly count: number } | undefined> => {
  const json = await sendRequest(token, apiUrl, '/client/count', { email })
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

export const getWatchersOnEmail = async (
  token: string,
  apiUrl: ValidString,
  email: ValidEmail
): Promise<ValidWatcherId[] | undefined> => {
  const json = await sendRequest(token, apiUrl, '/client/detail', { email: email.toString() })
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

export const createWatcher = async (
  token: string,
  apiUrl: ValidString,
  data: WatcherClientCreateParams
): Promise<boolean> => {
  try {
    const json = await sendRequest(token, apiUrl, '/client/create', { ...data })
    if (json.result !== 'Success') {
      return false
    }
  } catch (err) {
    return false
  }

  return true
}

export const sendWatchersList = async (
  token: string,
  apiUrl: ValidString,
  email: string,
  lang: ValidLanguage
): Promise<boolean> => {
  try {
    const json = await sendRequest(token, apiUrl, '/client/send-watcher-list', { email, lang: lang.toString() })
    if (json.result !== 'Success') {
      return false
    }
  } catch (err) {
    return false
  }

  return true
}

export const deleteWatcher = async (
  token: string,
  apiUrl: ValidString,
  id: ValidWatcherId,
  email: ValidEmail
): Promise<boolean> => {
  try {
    const json = await sendRequest(token, apiUrl, '/client/delete', { id: id.toString(), email: email.toString() })
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
  apiUrl: ValidString,
  url: string,
  data: UnknownNestedObject
): Promise<UnknownNestedObject> => {
  const endpoint = apiUrl.toString() + url
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

  // tslint:disable-next-line:no-unsafe-any
  if (data.initStep && !Object.values(StepToShow).includes(data.initStep)) {
    throw new Error('Flight Watchdog: Bad init step')
  }

  // tslint:disable-next-line:no-unsafe-any
  const initStep = data.initStep ? <StepToShow>data.initStep : undefined

  // tslint:disable-next-line:no-unsafe-any
  const apiUrl = new ValidString(data.apiUrl ? data.apiUrl : process.env.API_URL)

  return {
    keepMinimalisedInDays,
    token: token.toString(),
    initStep,
    apiUrl
  }
}
