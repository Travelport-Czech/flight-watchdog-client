import * as React from 'react';
import { Text } from 'shared/translation/Text';
import { TranslationEnum } from 'shared/translation/TranslationEnum';
export class EmailLowerPriceSubject extends React.Component {
    render() {
        return (React.createElement(Text, { name: TranslationEnum.EmailLowerPriceSubject },
            this.props.origin.toString(),
            this.props.destination.toString()));
    }
}
//# sourceMappingURL=EmailLowerPriceSubject.js.map