import * as React from 'react';
import { Text } from 'shared/translation/Text';
import { TranslationEnum } from 'shared/translation/TranslationEnum';
export class HeaderDates extends React.Component {
    render() {
        const { departure, arrival } = this.props;
        if (arrival) {
            return (React.createElement(Text, { name: TranslationEnum.ClientDatesReturn },
                departure.formatToLocalWithDayName(),
                arrival.formatToLocalWithDayName()));
        }
        return React.createElement(Text, { name: TranslationEnum.ClientDatesOneway }, departure.formatToLocalWithDayName());
    }
}
//# sourceMappingURL=HeaderDates.js.map