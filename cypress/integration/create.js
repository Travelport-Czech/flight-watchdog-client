import { golUrlReturn, setOtpions } from '../support/helper'

const createButtonSelector = '#flight-watchdog-window-clicked-create-watcher'

describe('Create watcher', function() {
    it('Default success', function() {
        cy.visit(golUrlReturn)
        setOtpions()
        cy.contains('Chcete hlídat cenu 2 000 CZK?')
        cy.contains('Praha - Letište Václava Havla')
        cy.contains('Londýn')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvělé, hotovo. Až najdeme nižší cenu, pošleme Vám E-mail.')
        cy.get('.content button').click()
        cy.contains('Hledáte levnější letenku? Klikněte zde.')
    })

    it('Bad email', function() {
        cy.visit(golUrlReturn)
        setOtpions()
        cy.contains('Chcete hlídat cenu 2 000 CZK?')
        cy.get('.content input').type('michal')
        cy.get(createButtonSelector).click()
        cy.contains('E-mail nemá správný formát')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvělé, hotovo. Až najdeme nižší cenu, pošleme Vám E-mail.')
    })
})
