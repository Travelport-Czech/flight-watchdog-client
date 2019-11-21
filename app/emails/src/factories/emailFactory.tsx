import { rawEmailAttachmentPartTemplate, rawEmailTemplate } from '@emails/factories/emailTemplates'
import { HeaderDestination } from '@emails/reactComponents/HeaderDestination'
import { WatchersGraphPriceHistory } from '@emails/reactComponents/WatchersGraphPriceHistory'
import { CreateImageCallback } from '@emails/types/CreateImageCallback'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import { primaryBackgroundColor, secondaryBackgroundColor } from '@shared/reactComponents/styles'
import { Text } from '@shared/translation/Text'
import { TranslationEnum } from '@shared/translation/TranslationEnum'
import { ValidEmail, ValidLanguage } from '@travelport-czech/valid-objects-ts'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export const createEmailRawBegin = (
  subject: string,
  content: string,
  emailTo: ValidEmail,
  emailFrom: ValidEmail,
  lang: ValidLanguage
): string => {
  // tslint:disable-next-line:no-let
  let raw: string
  const subjectBase64 = Buffer.from(subject).toString('base64')
  const noReplyName = Buffer.from(
    renderToStaticMarkup(<Text name={TranslationEnum.EmailNoReplyName} lang={lang} />)
  ).toString('base64')
  const htmlBase64 = Buffer.from(content)
    .toString('base64')
    .replace(/([^\0]{76})/g, '$1\n') // breaks long lines

  raw = rawEmailTemplate.replace(/\{emailTo\}/g, emailTo.toString())
  raw = raw.replace(/\{subject\}/g, '=?utf-8?B?' + subjectBase64 + '?=')
  raw = raw.replace(/\{emailFromName\}/g, '=?utf-8?B?' + noReplyName + '?=')
  raw = raw.replace(/\{emailFrom\}/g, emailFrom.toString())
  raw = raw.replace(/\{content\}/g, htmlBase64)

  return raw
}

const createAttachmentPngRaw = (name: string, contentBase64: string) => {
  // tslint:disable-next-line:no-let
  let raw: string
  const content = contentBase64.replace(/([^\0]{76})/g, '$1\n') // breaks long lines
  raw = rawEmailAttachmentPartTemplate.replace(/\{image\}/g, content)
  raw = raw.replace(/\{name\}/g, name)

  return raw
}

export const createAttachmentRawFromWatcherList = async (
  createImage: CreateImageCallback,
  watcherFullInfoList: WatcherFullInfo[]
): Promise<string> => {
  const promiseList = watcherFullInfoList.map(
    async (watcherFullInfo: WatcherFullInfo): Promise<string> => {
      const priceHitory = await createAttachmentRawFromWatcherPriceHistory(createImage, watcherFullInfo)
      const header = await createAttachmentRawFromWatcherHeader(createImage, watcherFullInfo)

      return priceHitory + header
    }
  )
  const results = await Promise.all(promiseList)

  return results.join('')
}

export const createAttachmentRawFromWatcherHeader = async (
  createImage: CreateImageCallback,
  watcherFullInfo: WatcherFullInfo
): Promise<string> => {
  const { lang } = watcherFullInfo.watcher

  return createAttachmentFromReact(
    createImage,
    `watcherheader-${watcherFullInfo.watcher.id.toString()}`,
    <HeaderDestination lang={lang} showHtml watcherFullInfo={watcherFullInfo} />,
    200,
    secondaryBackgroundColor
  )
}

export const createAttachmentRawFromWatcherPriceHistory = async (
  createImage: CreateImageCallback,
  watcherFullInfo: WatcherFullInfo
): Promise<string> => {
  const image = await createImage(
    renderToStaticMarkup(
      <WatchersGraphPriceHistory
        searchResults={watcherFullInfo.searchResults}
        priceLimit={watcherFullInfo.watcher.priceLimit}
        watcher={watcherFullInfo.watcher}
        absolutePosition
      />
    ),
    600,
    200,
    primaryBackgroundColor
  )

  return createAttachmentPngRaw(watcherFullInfo.watcher.id.toString(), image)
}

export const createAttachmentFromReact = async (
  createImage: CreateImageCallback,
  name: string,
  element: React.ReactElement,
  heigh: number,
  backgroundColor: string
): Promise<string> => {
  const html = renderToStaticMarkup(element)
  const image = await createImage(html, 600, heigh, backgroundColor)

  return createAttachmentPngRaw(name, image)
}
