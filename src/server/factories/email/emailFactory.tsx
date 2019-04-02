import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { rawEmailAttachmentPartTemplate, rawEmailTemplate } from 'src/server/factories/email/emailTemplates'
import { EmailNoReplyName } from 'src/server/reactComponents/EmailNoReplyName'
import { ValidEmail } from 'src/shared/validObjects/ValidEmail'

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

export const createAttachmentPngRaw = (name: string, contentBase64: string) => {
  // tslint:disable-next-line:no-let
  let raw: string
  const content = contentBase64.replace(/([^\0]{76})/g, '$1\n') // breaks long lines
  raw = rawEmailAttachmentPartTemplate.replace(/\{image\}/g, content)
  raw = raw.replace(/\{name\}/g, name)

  return raw
}
