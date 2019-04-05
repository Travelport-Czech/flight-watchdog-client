import * as styles from '@shared/reactComponents/styles'
import * as React from 'react'

interface Props {
  readonly style?: object
  readonly asLink?: boolean
  readonly id?: string
  onClick(event: React.MouseEvent<HTMLButtonElement>): void
}

interface State {
  readonly hovered: boolean
}

export class Button extends React.Component<Props, State> {
  public readonly state: Readonly<State> = {
    hovered: false
  }

  public render() {
    const { style, asLink, id, onClick, children } = this.props

    const defaultStyle = ((): React.CSSProperties => {
      if (asLink) {
        if (this.state.hovered) {
          return { ...styles.buttonLink, ...styles.buttonLinkHovered }
        }

        return styles.buttonLink
      }

      if (this.state.hovered) {
        return { ...styles.button, ...styles.buttonHovered }
      }

      return styles.button
    })()

    return (
      <button
        style={{ ...defaultStyle, ...style }}
        type="button"
        onMouseEnter={this.setHovered}
        onMouseLeave={this.setNotHovered}
        id={id}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  private readonly setHovered = () => {
    this.setState({ hovered: true })
  }

  private readonly setNotHovered = () => {
    this.setState({ hovered: false })
  }
}
