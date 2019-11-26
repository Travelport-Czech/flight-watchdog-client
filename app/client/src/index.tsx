import { App } from '@client/App'
import { isValidClientSettings } from '@client/functions'
import { UnknownNestedObject } from '@client/types/UnknownNestedObject'
import { createAppConfigFromFe } from '@client/utils/createAppConfigFromFe'
import { createTagManagerSnippet } from '@client/utils/createTagManagerSnippet'
import { BrowserClient, Hub, Scope } from '@sentry/browser'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

// tslint:disable-next-line:export-name no-any
export const initFlightWatchdogClient = async (settingsData: UnknownNestedObject) => {
  const settings = isValidClientSettings(settingsData)

  const sentryClient = settings.sentryDns
    ? new Hub(
        new BrowserClient({
          dsn: settings.sentryDns.toString(),
          release: process.env.RELEASE_HASH
        })
      )
    : undefined

  const golUrl = decodeURIComponent(window.location.href)

  const handleError = (err: Error, data?: unknown) => {
    handleErrorDefault(sentryClient, golUrl, err, data)
  }

  try {
    if (settings.analyticsId) {
      createTagManagerSnippet(settings.analyticsId.toString())
    }

    const appConfig = createAppConfigFromFe(document, golUrl)

    if (!appConfig) {
      return
    }

    const isVisible = appConfig.emailForWatcherDelete || appConfig.emailForWatcherDelete

    const id = 'flight-watchdog-client-app'
    const node = document.createElement('div')
    node.setAttribute('id', id)
    if (!isVisible) {
      node.setAttribute('style', 'display: none')
    }
    document.body.appendChild(node)

    ReactDOM.render(
      <App appConfig={appConfig} clientSettings={settings} handleError={handleError} />,
      document.getElementById(id)
    )
  } catch (err) {
    // tslint:disable-next-line:no-unsafe-any
    handleError(err)
  }
}

const handleErrorDefault = (sentryClient: Hub | undefined, url: string, err: Error, data?: unknown) => {
  // tslint:disable-next-line
  console.log('Flight watchdog error:', err)
  if (sentryClient) {
    sentryClient.configureScope((scope: Scope) => {
      scope.setExtra('url', url)
      if (data) {
        scope.setExtra('data', JSON.stringify(data))
      }
    })
    sentryClient.captureException(err)
  }
}

// set as global function
// tslint:disable-next-line:no-any
const global = window as any
// tslint:disable-next-line:no-object-mutation no-unsafe-any
global.initFlightWatchdogClient = initFlightWatchdogClient
