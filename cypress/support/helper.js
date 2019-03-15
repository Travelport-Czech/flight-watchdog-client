const dateFrom = '2018-11-01'
const dateTo = '2018-11-05'
export const golUrlReturn =
    '?action=vFlights&flights[0][departureDate]=' +
    dateFrom +
    '&flights[0][destination]=LON&flights[0][origin]=PRG&flights[1][departureDate]=' +
    dateTo +
    '&flights[1][destination]=PRG&flights[1][origin]=LON&travelers[0]=ADT&returnTicket=on&dateVariants=exact&step=ChooseFromFour'

export const setOtpions = ({ token, keepMinimalisedInDays, lang } = {}) => {
    if (token !== undefined) {
        cy.get('#option-token').clear().type(token)
    }
    if (keepMinimalisedInDays !== undefined) {
        cy.get('#option-keepMinimalisedInDays').clear().type(keepMinimalisedInDays)
    }
    if (lang !== undefined) {
        cy.get('#option-lang').clear().type(lang)
    }
    cy.get('#option-load-button').click()
}
