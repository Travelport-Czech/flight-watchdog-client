import { rawEmailAttachmentPartTemplate, rawEmailTemplate } from 'emails/factories/emailTemplates';
import { EmailNoReplyName } from 'emails/reactComponents/EmailNoReplyName';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
export const createEmailRawBegin = (subject, content, emailTo, emailFrom) => {
    let raw;
    const subjectBase64 = Buffer.from(subject).toString('base64');
    const noReplyName = Buffer.from(renderToStaticMarkup(React.createElement(EmailNoReplyName, null))).toString('base64');
    const htmlBase64 = Buffer.from(content)
        .toString('base64')
        .replace(/([^\0]{76})/g, '$1\n');
    raw = rawEmailTemplate.replace(/\{emailTo\}/g, emailTo.toString());
    raw = raw.replace(/\{subject\}/g, '=?utf-8?B?' + subjectBase64 + '?=');
    raw = raw.replace(/\{emailFromName\}/g, '=?utf-8?B?' + noReplyName + '?=');
    raw = raw.replace(/\{emailFrom\}/g, emailFrom.toString());
    raw = raw.replace(/\{content\}/g, htmlBase64);
    return raw;
};
export const createAttachmentPngRaw = (name, contentBase64) => {
    let raw;
    const content = contentBase64.replace(/([^\0]{76})/g, '$1\n');
    raw = rawEmailAttachmentPartTemplate.replace(/\{image\}/g, content);
    raw = raw.replace(/\{name\}/g, name);
    return raw;
};
//# sourceMappingURL=emailFactory.js.map