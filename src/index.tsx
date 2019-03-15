import { BrowserClient, Hub, Scope } from '@sentry/browser'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from 'src/App'
import { isValidClientSettings } from 'src/functions'
import { ValidEmail } from 'src/validObjects/ValidEmail'
import { ValidLanguage } from 'src/validObjects/ValidLanguage'
import { ValidPrice } from 'src/validObjects/ValidPrice'

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
    createTagManagerSnippet()

    const id = 'flight-watchdog-client-app'
    const node = document.createElement('div')
    node.setAttribute('id', id)
    document.body.appendChild(node)

    const userEmail = getCustomerEmail()

    const lowestPriceHtmlElement = document.getElementsByClassName('AO3_TotalFareValue').item(0) as HTMLSpanElement
    const lowestPrice =
      lowestPriceHtmlElement && lowestPriceHtmlElement.textContent ? lowestPriceHtmlElement.textContent : ''

    if (!lowestPrice) {
      return
    }

    const price = new ValidPrice(lowestPrice)

    const langElement = document.getElementsByTagName('html').item(0)
    const lang = new ValidLanguage(langElement && langElement.getAttribute('lang'))

    ReactDOM.render(
      <App golUrl={golUrl} userEmail={userEmail} clientSettings={settings} price={price} lang={lang} />,
      document.getElementById(id)
    )
  } catch (err) {
    // tslint:disable-next-line
    console.log('FLight watchdog error', err)
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

const getCustomerEmail = (): ValidEmail | undefined => {
  try {
    const userEmailHtmlElement = document.getElementById('fiUsername') as HTMLInputElement

    return userEmailHtmlElement && userEmailHtmlElement.value ? new ValidEmail(userEmailHtmlElement.value) : undefined
  } catch (err) {
    return
  }
}

const createTagManagerSnippet = (): void => {
  const analyticsId = process.env.ANALYTICS_ID
  if (!analyticsId) {
    return
  }
  const script = document.createElement('script')
  // tslint:disable-next-line:max-line-length
  const text = document.createTextNode(
    "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','" +
      analyticsId +
      "');"
  )
  script.appendChild(text)
  if (document.head) {
    document.head.appendChild(script)
  }

  const noscript = document.createElement('noscript')
  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', 'https://www.googletagmanager.com/ns.html?id=' + analyticsId)
  iframe.setAttribute('height', '0')
  iframe.setAttribute('width', '0')
  iframe.setAttribute('style', 'display:none;visibility:hidden')
  noscript.appendChild(iframe)
  document.body.appendChild(noscript)
}

// set as global function
// tslint:disable-next-line:no-any
const global = window as any
// tslint:disable-next-line:no-object-mutation no-unsafe-any
global.initFlightWatchdogClient = initFlightWatchdogClient
