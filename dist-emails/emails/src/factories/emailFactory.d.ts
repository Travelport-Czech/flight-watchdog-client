import { ValidEmail } from 'shared/validObjects/ValidEmail';
export declare const createEmailRawBegin: (subject: string, content: string, emailTo: ValidEmail, emailFrom: ValidEmail) => string;
export declare const createAttachmentPngRaw: (name: string, contentBase64: string) => string;
