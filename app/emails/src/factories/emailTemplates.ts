// tslint:disable-next-line:max-line-length
export const emailTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Flight Watchdog</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Roboto', sans-serif;">
 {content}
</body>
</html>`

export const rawEmailTemplate = `From: {emailFromName} <{emailFrom}>
To: {emailTo}
Reply-To: {emailReplyTo}
Return-Path: {emailFrom}
Subject: {subject}
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="NextPart"

--NextPart
Content-Type: text/html; charset="UTF-8"
Content-Transfer-Encoding: base64

{content}

--NextPart`

export const rawEmailAttachmentPartTemplate = `
Content-Type: image/png; name="price-history.png"
Content-ID: <{name}>
Content-Transfer-Encoding: base64
Content-Disposition: attachment

{image}

--NextPart`

export const rawEmailEndPart = `--`
