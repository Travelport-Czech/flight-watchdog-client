
export const setOtpions = ({ token, keepMinimalisedInDays, lang, url, flightType, price, defaultPrice } = {}) => {
    if (url !== undefined) {
        cy.get('#option-url').clear().type(url)
    }
    if (token !== undefined) {
        cy.get('#option-token').clear().type(token)
    }
    if (keepMinimalisedInDays !== undefined) {
        cy.get('#option-keepMinimalisedInDays').clear().type(keepMinimalisedInDays)
    }
    if (lang !== undefined) {
        cy.get('#option-lang').clear().type(lang)
    }
    if (flightType !== undefined) {
        cy.get('#option-flighttype').clear().type(flightType)
    }
    if (defaultPrice !== undefined) {
        cy.get('#option-defaultPrice').clear().type(defaultPrice)
    }
    if (price !== undefined) {
        cy.get('#option-price').clear().type(price)
    }
    cy.get('#option-load-button').click()
}

export const normalizeText = (s) => s.replace(/\s/g, ' ')
