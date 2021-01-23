import { StepToShow } from '@client/StepsToShow'
import { ClientSettings } from '@client/types/ClientSettings'
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
import * as z from 'zod'

export const isAllowedToAddWatcher = async (token: string, apiUrl: ValidString): Promise<boolean> => {
  const schema = z.object({
    result: z.enum(['Success']),
    context: z.object({
      limit: z.number().int().nonnegative(),
      count: z.number().int().nonnegative(),
    }),
  })
  const response = await sendRequest(token, apiUrl, '/count-all', {})
  const result = schema.parse(response)

  if (result.context.count >= result.context.limit) {
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
  const schema = z.object({
    result: z.string(),
    context: z.array(
      z.object({
        code: z.string().length(3),
        name: z.string().optional(),
      })
    ),
  })
  const response = await sendRequest(token, apiUrl, '/destination-name', {
    lang: lang.toString(),
    locationCode: locationCodeList.toString(),
  })

  const result = schema.parse(response)

  if (result.result !== 'Success') {
    return []
  }

  return result.context.map((item) => {
    return {
      code: new ValidIATALocation(item.code),
      name: item.name ? new ValidString(item.name).toString() : undefined,
    }
  })
}

export const getWatchersCountOnEmail = async (
  token: string,
  apiUrl: ValidString,
  email: string
): Promise<{ readonly limit: number; readonly count: number }> => {
  const schema = z.object({
    result: z.enum(['Success']),
    context: z.object({
      emailLimit: z.number().int().nonnegative(),
      count: z.number().int().nonnegative(),
    }),
  })

  const response = await sendRequest(token, apiUrl, '/count', { email })

  const result = schema.parse(response)

  return {
    count: result.context.count,
    limit: result.context.emailLimit,
  }
}

export const getWatchersOnEmail = async (
  token: string,
  apiUrl: ValidString,
  email: ValidEmail
): Promise<ValidString[] | undefined> => {
  const schema = z.object({
    result: z.enum(['Success']),
    context: z.array(
      z.object({
        id: z.string().min(1),
      })
    ),
  })

  const response = await sendRequest(token, apiUrl, '/watchers', { email: email.toString() })

  const result = schema.parse(response)

  return result.context.map((item) => {
    return new ValidString(item.id)
  })
}

export const createWatcher = async (
  token: string,
  apiUrl: ValidString,
  data: WatcherClientCreateParams
): Promise<boolean> => {
  try {
    const schema = z.object({
      result: z.enum(['Success']),
    })

    const response = await sendRequest(token, apiUrl, '/create', { ...data })

    schema.parse(response)

    return true
  } catch (e) {
    return false
  }
}

export const sendWatchersList = async (
  token: string,
  apiUrl: ValidString,
  email: string,
  lang: ValidLanguage
): Promise<boolean> => {
  try {
    const schema = z.object({
      result: z.enum(['Success']),
    })

    const response = await sendRequest(token, apiUrl, '/send-watcher-list', { email, lang: lang.toString() })

    schema.parse(response)

    return true
  } catch (err) {
    return false
  }
}

export const deleteWatcher = async (
  token: string,
  apiUrl: ValidString,
  id: ValidString,
  email: ValidEmail
): Promise<boolean> => {
  try {
    const schema = z.object({
      result: z.enum(['Success']),
    })

    const response = await sendRequest(token, apiUrl, '/delete', { id: id.toString(), email: email.toString() })

    schema.parse(response)

    return true
  } catch (err) {
    return false
  }
}

export const sendRequest = async (token: string, apiUrl: ValidString, url: string, data: unknown): Promise<unknown> => {
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
export const isValidClientSettings = (data: unknown): ClientSettings => {
  console.log('michal', data)
  const schema = z.object({
    token: z.string().min(1),
    keepMinimalisedInDays: z.number().int().nonnegative().default(7),
    initStep: z.nativeEnum(StepToShow).optional(),
    apiUrl: z.string().default(process.env.API_URL as string),
    analyticsId: z.string().default(process.env.ANALYTICS_ID as string),
    sentryDns: z.string().default(process.env.SENTRY_DNS as string),
  })

  const result = schema.parse(data)

  const keepMinimalisedInDays = new ValidNumber(result.keepMinimalisedInDays)
  const apiUrl = new ValidString(result.apiUrl)

  const analyticsId = result.analyticsId === 'false' ? undefined : new ValidString(result.analyticsId)

  const sentryDns = result.sentryDns === 'false' ? undefined : new ValidString(result.sentryDns)

  return {
    keepMinimalisedInDays,
    token: result.token,
    initStep: result.initStep,
    apiUrl,
    analyticsId,
    sentryDns,
  }
}
