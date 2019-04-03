import * as React from 'react';
import { HeaderDates } from 'shared/reactComponents/HeaderDates';
import { LocationNameList } from 'shared/reactComponents/LocationNameList';
import * as styles from 'shared/reactComponents/styles';
import { Text } from 'shared/translation/Text';
import { TranslationEnum } from 'shared/translation/TranslationEnum';
export class EmailLowerPriceHeader extends React.Component {
    render() {
        const { watcherFullInfo } = this.props;
        const { watcher, watcherLinks, originLocationList, destinationLocationList } = watcherFullInfo;
        const { frontendUrl } = watcherLinks;
        const destinationTextKey = watcher.flightType.isReturn()
            ? TranslationEnum.ClientDestinationsReturn
            : TranslationEnum.ClientDestinationsOneway;
        return (React.createElement("div", { style: styles.header },
            React.createElement("div", { style: styles.headerText },
                React.createElement(Text, { name: TranslationEnum.EmailTitle })),
            React.createElement("div", { style: styles.headerTextDescription },
                React.createElement(Text, { name: TranslationEnum.EmailDescription },
                    React.createElement("a", { href: frontendUrl.toString() }, frontendUrl.toString()))),
            React.createElement("div", { style: styles.headerDestinations },
                React.createElement(Text, { name: destinationTextKey },
                    React.createElement("span", { style: styles.primaryColor },
                        React.createElement(LocationNameList, { locationList: originLocationList })),
                    React.createElement("span", { style: styles.primaryColor },
                        React.createElement(LocationNameList, { locationList: destinationLocationList })))),
            React.createElement("div", { style: styles.headerDates },
                React.createElement(HeaderDates, { departure: watcher.departure, arrival: watcher.arrival }))));
    }
}
//# sourceMappingURL=EmailLowerPriceHeader.js.map