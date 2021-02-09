
export const setOtpions = ({ token, keepMinimalisedInDays, lang, url, flightType, price, defaultPrice } = {}) => {
    if (url !== undefined) {
        cy.get('#option-url').clear().type(url, { delay: 0, force: true})
    }
    if (token !== undefined) {
        cy.get('#option-token').clear().type(token, { delay: 0, force: true})
    }
    if (keepMinimalisedInDays !== undefined) {
        cy.get('#option-keepMinimalisedInDays').clear().type(keepMinimalisedInDays, { delay: 0, force: true})
    }
    if (lang !== undefined) {
        cy.get('#option-lang').clear().type(lang, { delay: 0, force: true})
    }
    if (flightType !== undefined) {
        cy.get('#option-flighttype').clear().type(flightType, { delay: 0, force: true})
    }
    if (defaultPrice !== undefined) {
        cy.get('#option-defaultPrice').clear().type(defaultPrice, { delay: 0, force: true})
    }
    if (price !== undefined) {
        cy.get('#option-price').clear().type(price, { delay: 0, force: true})
    }
    cy.get('#option-load-button').click()
}

export const normalizeText = (s) => s.replace(/\s/g, ' ')
