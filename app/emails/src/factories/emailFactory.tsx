import { ValidEmail } from '@ceesystems/valid-objects-ts'
import { rawEmailAttachmentPartTemplate, rawEmailTemplate } from '@emails/factories/emailTemplates'
import { EmailNoReplyName } from '@emails/reactComponents/EmailNoReplyName'
import { WatchersGraphPriceHistory } from '@emails/reactComponents/WatchersGraphPriceHistory'
import { WatcherFullInfo } from '@emails/types/WatcherFullInfo'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export const createEmailRawBegin = (
  subject: string,
  content: string,
  emailTo: ValidEmail,
  emailFrom: ValidEmail
): string => {
  // tslint:disable-next-line:no-let
  let raw: string
  const subjectBase64 = Buffer.from(subject).toString('base64')
  const noReplyName = Buffer.from(renderToStaticMarkup(<EmailNoReplyName />)).toString('base64')
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
  createImage: (html: string, width: number, height: number) => Promise<string>,
  watcherFullInfoList: WatcherFullInfo[]
): Promise<string> => {
  const promiseList = watcherFullInfoList.map(
    async (watcherFullInfo: WatcherFullInfo): Promise<string> => {
      return createAttachmentRawFromWatcher(createImage, watcherFullInfo)
    }
  )
  const results = await Promise.all(promiseList)

  return results.join('')
}

export const createAttachmentRawFromWatcher = async (
  createImage: (html: string, width: number, height: number) => Promise<string>,
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
    200
  )

  return createAttachmentPngRaw(watcherFullInfo.watcher.id.toString(), image)
}
