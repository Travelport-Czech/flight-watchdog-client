import * as styles from '@shared/reactComponents/styles'
import * as React from 'react'

interface Props {
    onClick(event: React.MouseEvent<HTMLElement>): void
}

export class CrossButton extends React.Component<Props> {
    public render() {
        const { onClick } = this.props

        return (
            <span style={styles.crossButton} id="flight-watchdog-window-cross-close" onClick={onClick} role="button">
                &times;
            </span>
        )
    }
}
