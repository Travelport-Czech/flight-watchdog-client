import { getEmailExample, isValidClientSettings } from 'src/client/functions'
import { ValidLanguage } from 'src/client/validObjects/ValidLanguage'
import { ValidString } from 'src/client/validObjects/ValidString'

// tslint:disable-next-line:export-name no-any
export const showEmail = async (settingsData: any, emailName: any) => {
  const settings = isValidClientSettings(settingsData)
  const langElement = document.getElementsByTagName('html').item(0)
  const lang = new ValidLanguage(langElement && langElement.getAttribute('lang'))
  // tslint:disable-next-line:no-unsafe-any
  const apiUrl = new ValidString(settingsData.apiUrl ? settingsData.apiUrl : process.env.API_URL)
  const name = new ValidString(emailName)
  const iframeOld = document.getElementsByTagName('iframe')[0]
  if (iframeOld) {
    iframeOld.remove()
  }
  const iframe = document.createElement('iframe')
  iframe.setAttribute('width', '100%')
  iframe.setAttribute('height', '1000')
  document.body.appendChild(iframe)
  const emailContent = await getEmailExample(settings.token, apiUrl, lang, name)
  if (iframe.contentWindow) {
    const doc = iframe.contentWindow.document
    doc.open()
    doc.write(emailContent)
    doc.close()
  }
}

// set as global function
// tslint:disable-next-line:no-any
const global = window as any
// tslint:disable-next-line:no-object-mutation no-unsafe-any
global.showEmail = showEmail
