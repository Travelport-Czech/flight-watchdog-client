const dateFrom = '2018-11-01'
const dateTo = '2018-11-05'
export const golUrlReturn =
  '?action=vFlights&flights[0][departureDate]=' +
  dateFrom +
  '&flights[0][destination]=LON&flights[0][origin]=PRG%2B&flights[1][departureDate]=' +
  dateTo +
  '&flights[1][destination]=PRG&flights[1][origin]=LON&travelers[0]=ADT&returnTicket=on&dateVariants=exact&step=ChooseFromFour'

export const golUrlOneway =
  '?action=vFlights&flights[0][departureDate]=' +
  dateFrom +
  '&flights[0][destination]=LON&flights[0][origin]=PRG&travelers[0]=ADT&returnTicket=&dateVariants=exact&step=ChooseFromFour'

export const setOtpions = ({ token, keepMinimalisedInDays, lang, url, price, defaultPrice } = {}) => {
  if (url !== undefined) {
    cy.get('#option-url').clear().type(url, { delay: 0, force: true })
  }
  if (token !== undefined) {
    cy.get('#option-token').clear().type(token, { delay: 0, force: true })
  }
  if (keepMinimalisedInDays !== undefined) {
    cy.get('#option-keepMinimalisedInDays').clear().type(keepMinimalisedInDays, { delay: 0, force: true })
  }
  if (lang !== undefined) {
    cy.get('#option-lang').clear().type(lang, { delay: 0, force: true })
  }
  if (defaultPrice !== undefined) {
    cy.get('#option-defaultPrice').clear().type(defaultPrice, { delay: 0, force: true })
  }
  if (price !== undefined) {
    cy.get('#option-price').clear().type(price, { delay: 0, force: true })
  }
  cy.get('#option-load-button').click()
}

export const normalizeText = (s) => s.replace(/\s/g, ' ')
