import { createAttachmentPngRaw, createEmailRawBegin } from 'emails/factories/emailFactory';
import { emailTemplate, rawEmailEndPart } from 'emails/factories/emailTemplates';
import { EmailLowerPriceContent } from 'emails/reactComponents/EmailLowerPriceContent';
import { EmailLowerPriceSubject } from 'emails/reactComponents/EmailLowerPriceSubject';
import { WatchersGraphPriceHistory } from 'emails/reactComponents/WatchersGraphPriceHistory';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
export const createLowerPriceEmailRaw = async (createImage, watcherFullInfo, price, emailFrom) => {
    const { origin, destination } = watcherFullInfo.watcher;
    const subject = renderToStaticMarkup(React.createElement(EmailLowerPriceSubject, { origin: origin, destination: destination }));
    const content = await createLowerPriceEmail(watcherFullInfo, price, false);
    const rawEmail = createEmailRawBegin(subject, content, watcherFullInfo.watcher.email, emailFrom);
    const image = await createImage(React.createElement(WatchersGraphPriceHistory, { searchResults: watcherFullInfo.searchResults, priceLimit: watcherFullInfo.watcher.priceLimit, watcher: watcherFullInfo.watcher, absolutePosition: true }), 600, 200);
    const attachments = createAttachmentPngRaw(watcherFullInfo.watcher.id.toString(), image);
    return rawEmail + attachments + rawEmailEndPart;
};
export const createLowerPriceEmail = async (watcherFullInfo, price, showSvg) => {
    const content = React.createElement(EmailLowerPriceContent, { watcherFullInfo: watcherFullInfo, price: price, showSvg: showSvg });
    return emailTemplate.replace(/\{content\}/g, renderToStaticMarkup(content));
};
//# sourceMappingURL=lowerPriceEmailFactory.js.map