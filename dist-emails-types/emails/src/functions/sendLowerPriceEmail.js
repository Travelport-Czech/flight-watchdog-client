import { createLowerPriceEmailRaw } from 'emails/factories/lowerPriceEmailFactory';
import { initializeTranslator } from 'shared/translation/Text';
export const sendLowerPriceEmail = async (sendEmail, createImage, watcherFullInfo, price, emailFrom) => {
    initializeTranslator(watcherFullInfo.watcher.lang);
    const emailContent = await createLowerPriceEmailRaw(createImage, watcherFullInfo, price, emailFrom);
    await sendEmail(emailContent);
};
//# sourceMappingURL=sendLowerPriceEmail.js.map