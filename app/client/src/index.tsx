import { BrowserClient, Hub, Scope } from '@sentry/browser'
import { App } from 'client/App'
import { isValidClientSettings } from 'client/functions'
import { createAppConfigFromGolFe } from 'client/utils/createAppConfigFromGolFe'
import { createTagManagerSnippet } from 'client/utils/createTagManagerSnippet'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

const analyticsId = process.env.ANALYTICS_ID

// tslint:disable-next-line:export-name no-any
export const initFlightWatchdogClient = async (settingsData: any) => {
  const settings = isValidClientSettings(settingsData)

  const sentryClient = process.env.SENTRY_DNS
    ? new Hub(
        new BrowserClient({
          dsn: process.env.SENTRY_DNS,
          release: process.env.RELEASE_HASH
        })
      )
    : undefined

  const golUrl = decodeURIComponent(window.location.href)

  try {
    if (analyticsId) {
      createTagManagerSnippet(analyticsId)
    }

    const id = 'flight-watchdog-client-app'
    const node = document.createElement('div')
    node.setAttribute('id', id)
    document.body.appendChild(node)

    const appConfig = createAppConfigFromGolFe(document, golUrl)

    if (!appConfig) {
      return
    }

    ReactDOM.render(<App appConfig={appConfig} clientSettings={settings} />, document.getElementById(id))
  } catch (err) {
    // tslint:disable-next-line
    console.log('Flight watchdog error', err)
    if (sentryClient) {
      sentryClient.configureScope((scope: Scope) => {
        scope.setExtra('url', golUrl)
      })
      sentryClient.captureException(err)
    } else {
      throw err
    }
  }
}

// set as global function
// tslint:disable-next-line:no-any
const global = window as any
// tslint:disable-next-line:no-object-mutation no-unsafe-any
global.initFlightWatchdogClient = initFlightWatchdogClient
