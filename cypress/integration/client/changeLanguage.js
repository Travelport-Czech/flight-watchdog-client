import { golUrlReturn, setOtpions } from '../../support/helper'

const createButtonSelector = '#flight-watchdog-window-clicked-create-watcher'

describe('Change language', function() {
    it('English', function() {
        cy.visit(golUrlReturn)
        setOtpions({lang: 'en'})
        cy.contains('Do you want to track the price 2 000 CZK?')
        cy.contains('Prague - Ruzyne')
        cy.contains('London')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Done. When we find a lower price, we will send you an email.')
        cy.get('.content button').click()
        cy.contains('Looking for a cheaper flight? Click here.')
    })
})
