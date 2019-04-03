import { EmailButton } from 'emails/reactComponents/EmailButton';
import { EmailLowerPriceHeader } from 'emails/reactComponents/EmailLowerPriceHeader';
import { WatcherPriceHistory } from 'emails/reactComponents/WatcherPriceHistory';
import * as React from 'react';
import * as styles from 'shared/reactComponents/styles';
import { Text } from 'shared/translation/Text';
import { TranslationEnum } from 'shared/translation/TranslationEnum';
export class EmailLowerPriceContent extends React.Component {
    render() {
        const { watcherFullInfo, price, showSvg } = this.props;
        const { watcher, watcherLinks } = watcherFullInfo;
        const { resultLink, continueLink } = watcherLinks;
        const priceDiff = watcher.priceLimit.subtract(price);
        const priceDiffPercent = watcher.priceLimit.diffPercent(price);
        return (React.createElement("div", { style: { textAlign: 'center' } },
            React.createElement("table", { style: { width: '600px', margin: '0 auto' } },
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement(EmailLowerPriceHeader, { watcherFullInfo: watcherFullInfo }))),
                React.createElement("tr", null,
                    React.createElement("td", { style: { backgroundColor: '#fff' } },
                        React.createElement("div", { className: "content", style: styles.emailTableContent },
                            React.createElement("div", { style: { ...styles.simpleText, marginBottom: '15px' } },
                                React.createElement(Text, { name: TranslationEnum.EmailContentDescription },
                                    priceDiff.formatToLocale(),
                                    priceDiffPercent.toString())),
                            React.createElement("div", { style: { ...styles.simpleText, marginBottom: '5px' } },
                                React.createElement(Text, { name: TranslationEnum.EmailPricePrefixText })),
                            React.createElement("div", { style: { fontSize: '25px', lineHeight: '25px', marginBottom: '10px' } },
                                React.createElement(Text, { name: TranslationEnum.EmailPrice }, price.formatToLocale())),
                            React.createElement("div", { style: { ...styles.simpleText, marginBottom: '25px' } },
                                React.createElement(Text, { name: TranslationEnum.EmailPriceSuffixText }, watcher.priceLimit.formatToLocale())),
                            React.createElement("div", { style: { ...styles.simpleText, marginBottom: '10px' } },
                                React.createElement(Text, { name: TranslationEnum.EmailButtonShowResultPrefixText })),
                            React.createElement(EmailButton, { link: resultLink, text: TranslationEnum.EmailButtonShowResult, style: { marginBottom: '20px' } }),
                            React.createElement(WatcherPriceHistory, { watchersFullInfo: watcherFullInfo, showSvg: showSvg }),
                            React.createElement("div", { style: { ...styles.simpleText, marginBottom: '10px', marginTop: '20px' } },
                                React.createElement(Text, { name: TranslationEnum.EmailButtonContinueWatchingPrefixText })),
                            React.createElement(EmailButton, { link: continueLink, text: TranslationEnum.EmailButtonContinueWatching, style: { marginBottom: '50px' } }),
                            React.createElement("div", { style: { ...styles.simpleText, marginBottom: '15px' } },
                                React.createElement(Text, { name: TranslationEnum.EmailFooter }))))))));
    }
}
//# sourceMappingURL=EmailLowerPriceContent.js.map