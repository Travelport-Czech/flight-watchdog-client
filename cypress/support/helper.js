const dateFrom = '2018-11-01'
const dateTo = '2018-11-05'
export const golUrlReturn = `?from=PRG%2B&to=LON&flightClass=ECO&departureDate=${dateFrom}&returnDate=${dateTo}&ADT=1`

export const golUrlOneway = `?from=PRG&to=LON&flightClass=ECO&departureDate=${dateFrom}&returnDate=&ADT=1`

export const setOptions = ({ token, keepMinimalisedInDays, lang, url, price, defaultPrice } = {}) => {
    const finalUrl = url ? url : golUrlReturn
    cy.get('#option-url').clear().type(finalUrl, { delay: 0, force: true })
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
