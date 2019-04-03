import * as React from 'react';
import * as styles from 'shared/reactComponents/styles';
import { Text } from 'shared/translation/Text';
export class EmailButton extends React.Component {
    render() {
        const { link, text, style } = this.props;
        return (React.createElement("a", { href: link.toString(), style: { ...styles.emailButton, ...style } },
            React.createElement(Text, { name: text })));
    }
}
//# sourceMappingURL=EmailButton.js.map