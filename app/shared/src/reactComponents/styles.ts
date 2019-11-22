import { arrowImage } from '@shared/images/arrowImage'
import { logoImage } from '@shared/images/logoImage'
import { CSSProperties } from 'react'

const primaryTextColor = 'white'
const secondaryTextColor = 'black'

export const primaryBackgroundColor = '#ffb500'
export const secondaryBackgroundColor = '#005baa'
export const buttonColor = '#1e2d4d'

export const primaryColor: CSSProperties = {
  color: primaryTextColor
}

export const secondaryColor: CSSProperties = {
  color: secondaryTextColor
}

export const windowWrapper: CSSProperties = {
  position: 'absolute',
  left: '50%',
  top: '10%'
}

export const window: CSSProperties = {
  ...primaryColor,
  backgroundColor: 'white',
  boxShadow: '0px 0px 5px rgba(0,0,0,.3)',
  font: "normal normal 11px 'Source Sans Pro', sans-serif",
  position: 'relative',
  left: '-50%',
  textAlign: 'center',
  width: '350px',
  zIndex: 9999
}

const defaultInputItem: CSSProperties = {
  ...secondaryColor,
  backgroundColor: 'white',
  border: '0px solid #ccc',
  borderRadius: '3px',
  fontSize: '13px',
  margin: '0px',
  padding: '10px'
}

export const input: CSSProperties = {
  ...defaultInputItem,
  marginRight: '5px',
  width: '185px'
}

export const button: CSSProperties = {
  ...defaultInputItem,
  color: 'white',
  backgroundColor: buttonColor,
  fontWeight: 'bold',
  transition: 'all 300ms linear',
  width: '95px',
  fontFamily: "'Lato', sans-serif"
}

export const buttonHovered: CSSProperties = {
  backgroundColor: secondaryBackgroundColor,
  cursor: 'pointer',
  transition: 'all 300ms linear'
}

export const link: CSSProperties = {
  ...secondaryColor,
  background: 'transparent',
  border: 'none',
  textDecoration: 'none'
}

export const buttonLink: CSSProperties = {
  ...secondaryColor,
  background: 'transparent',
  border: 'none',
  lineHeight: '26px',
  textDecoration: 'underline'
}

export const buttonLinkHovered: CSSProperties = {
  cursor: 'pointer',
  textDecoration: 'none'
}

export const crossButton: CSSProperties = {
  cursor: 'pointer',
  display: 'block',
  fontSize: '20px',
  position: 'absolute',
  right: '10px',
  top: '5px',
  color: secondaryTextColor
}

export const errorText: CSSProperties = {
  color: 'red'
}

const section1: CSSProperties = {
  backgroundImage: `url(${logoImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPositionY: 'bottom',
  height: '210px'
}

export const section1email: CSSProperties = {
  ...section1,
  backgroundPositionX: 'right'
}

export const section1client: CSSProperties = {
  ...section1,
  backgroundPositionX: '140px'
}

const section1text: CSSProperties = {
  color: '#858484'
}

export const section1textEmail: CSSProperties = {
  ...section1text,
  fontSize: '1.5em',
  fontWeight: 'bold',
  lineHeight: '1.5em',
  width: '50%',
  paddingTop: '60px',
  paddingLeft: '20px',
  textAlign: 'left'
}

export const section1textClient: CSSProperties = {
  ...section1text,
  fontSize: '2.2em',
  fontWeight: 'bold',
  lineHeight: '1.5em',
  width: '80px',
  marginLeft: '40px',
  paddingTop: '30px'
}

export const section2: CSSProperties = {
  backgroundColor: secondaryBackgroundColor,
  minHeight: '35px',
  color: 'white',
  textTransform: 'uppercase',
  alignItems: 'center',
  fontWeight: 'bold',
  textAlign: 'center'
}

export const section2locations: CSSProperties = {
  display: 'flex',
  backgroundImage: `url(${arrowImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center'
}

export const section2box: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexBasis: '50%'
}

export const section2text: CSSProperties = {
  paddingLeft: '15px',
  paddingRight: '15px',
  paddingTop: '20px',
  paddingBottom: '20px',
  fontSize: '1.4em',
  width: '100%'
}

export const section2textLeft: CSSProperties = {
  ...section2text,
  paddingRight: '15px'
}

export const section2textRight: CSSProperties = {
  ...section2text,
  paddingLeft: '15px'
}

export const section2date: CSSProperties = {
  fontSize: '1.2em',
  paddingBottom: '10px'
}

export const section3: CSSProperties = {
  backgroundColor: primaryBackgroundColor,
  padding: '20px'
}

export const section3email: CSSProperties = {
  backgroundColor: primaryBackgroundColor,
}

export const headerTextDescription: CSSProperties = {
  lineHeight: '25px',
  textAlign: 'left'
}

export const headerLevel2: CSSProperties = {
  ...secondaryColor,
  fontSize: '18px',
  lineHeight: '28px',
  marginBottom: '10px'
}

export const headerDates: CSSProperties = {
  color: secondaryTextColor,
  fontSize: '13px',
  lineHeight: '13px',
  marginBottom: '15px'
}

export const simpleText: CSSProperties = {
  color: secondaryTextColor,
  fontSize: '14px',
  lineHeight: '16px',
  marginTop: '0px'
}

export const smallText: CSSProperties = {
  color: secondaryTextColor,
  fontSize: '11px',
  lineHeight: '12px',
  marginTop: '0px'
}

export const emailTableContent: CSSProperties = {
  borderTop: '1px solid black',
  padding: '20px',
  textAlign: 'center'
}

export const emailButton: CSSProperties = {
  ...button,
  width: '100px',
  textDecoration: 'none',
  display: 'block',
  margin: '0 auto',
  fontSize: '15px'
}

export const overlay: CSSProperties = {
  opacity: 0.4,
  backgroundColor: '#444',
  position: 'fixed',
  left: '0px',
  top: '0px',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  zIndex: 5000
}
