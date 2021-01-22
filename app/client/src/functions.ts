import { StepToShow } from '@client/StepsToShow'
import { ClientSettings } from '@client/types/ClientSettings'
import { UnknownNestedObject } from '@client/types/UnknownNestedObject'
import { WatcherClientCreateParams } from '@client/types/WatcherClientCreateParams'
import { createAuthorizationBasicToken } from '@client/utils/createAuthorizationBasicToken'
import { parseJson } from '@client/utils/parseJson'
import { Location } from '@shared/types/Location'
import {
  ValidEmail,
  ValidIATALocation,
  ValidIATALocationList,
  ValidLanguage,
  ValidNumber,
  ValidString,
} from '@travelport-czech/valid-objects-ts'

enum ResponseKeysEnum {
  Count = 'count',
  Limit = 'limit',
  EmailLimit = 'emailLimit',
}

export const isAllowedToAddWatcher = async (token: string, apiUrl: ValidString): Promise<boolean> => {
  const json = await sendRequest(token, apiUrl, '/count-all', {})
  if (json.result !== 'Success') {
    return false
  }

  if (!json.context) {
    return false
  }

  const count = new ValidNumber(json.context[ResponseKeysEnum.Count])
  const limit = new ValidNumber(json.context[ResponseKeysEnum.Limit])

  if (count.getNumber() >= limit.getNumber()) {
    return false
  }

  return true
}

export const getDestinationNames = async (
  token: string,
  apiUrl: ValidString,
  locationCodeList: ValidIATALocationList,
  lang: ValidLanguage
): Promise<Location[]> => {
  const json = await sendRequest(token, apiUrl, '/destination-name', {
    lang: lang.toString(),
    locationCode: locationCodeList.toString(),
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
        code: new ValidIATALocation(item.code),
        name: item.name ? new ValidString(item.name).toString() : undefined,
      }
    }
  )
}

export const getWatchersCountOnEmail = async (
  token: string,
  apiUrl: ValidString,
  email: string
): Promise<{ readonly limit: number; readonly count: number } | undefined> => {
  const json = await sendRequest(token, apiUrl, '/count', { email })
  if (json.result !== 'Success') {
    return
  }

  if (!json.context) {
    throw new Error('Flight Watchdog: Bad api response')
  }

  const count = new ValidNumber(json.context[ResponseKeysEnum.Count])
  const limit = new ValidNumber(json.context[ResponseKeysEnum.EmailLimit])

  return {
    count: count.getNumber(),
    limit: limit.getNumber(),
  }
}

export const getWatchersOnEmail = async (
  token: string,
  apiUrl: ValidString,
  email: ValidEmail
): Promise<ValidString[] | undefined> => {
  const json = await sendRequest(token, apiUrl, '/watchers', { email: email.toString() })
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
    return new ValidString(item.id)
  })
}

export const createWatcher = async (
  token: string,
  apiUrl: ValidString,
  data: WatcherClientCreateParams
): Promise<boolean> => {
  try {
    const json = await sendRequest(token, apiUrl, '/create', { ...data })
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
    const json = await sendRequest(token, apiUrl, '/send-watcher-list', { email, lang: lang.toString() })
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
  id: ValidString,
  email: ValidEmail
): Promise<boolean> => {
  try {
    const json = await sendRequest(token, apiUrl, '/delete', { id: id.toString(), email: email.toString() })
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
      authorization: createAuthorizationBasicToken('', token),
    },
    method: 'POST',
  })

  return parseJson(await response.text())
}

// tslint:disable-next-line:no-any
export const isValidClientSettings = (data: UnknownNestedObject): ClientSettings => {
  if (!data) {
    throw new Error('Flight Watchdog: Missing settings')
  }
  const token = new ValidString(data.token)

  const keepMinimalisedInDays = new ValidNumber(
    typeof data.keepMinimalisedInDays === 'number' ? data.keepMinimalisedInDays : 7
  )

  if (
    data.initStep &&
    typeof data.initStep === 'string' &&
    !Object.values(<string>(<unknown>StepToShow)).includes(data.initStep)
  ) {
    throw new Error('Flight Watchdog: Bad init step')
  }

  const initStep = data.initStep ? <StepToShow>data.initStep : undefined

  const apiUrl = new ValidString(data.apiUrl ? data.apiUrl : process.env.API_URL)

  const analyticsId =
    data.analyticsId === 'false'
      ? undefined
      : new ValidString(data.analyticsId ? data.analyticsId : process.env.ANALYTICS_ID)

  const sentryDns =
    data.sentryDns === 'false' ? undefined : new ValidString(data.sentryDns ? data.sentryDns : process.env.SENTRY_DNS)

  return {
    keepMinimalisedInDays,
    token: token.toString(),
    initStep,
    apiUrl,
    analyticsId,
    sentryDns,
  }
}
