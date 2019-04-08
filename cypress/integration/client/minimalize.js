import { golUrlReturn, setOtpions } from '../../support/helper'

const createButtonSelector = '#flight-watchdog-window-clicked-create-watcher'

describe('Minimalize', function() {
    it('Show minimalized after create and reload', function() {
        cy.visit(golUrlReturn)
        setOtpions()
        cy.contains('Chcete hlídat cenu 2 000 CZK?')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvělé, hotovo. Až najdeme nižší cenu, pošleme Vám E-mail.')
        cy.get('.content button').click()
        cy.contains('Hledáte levnější letenku? Klikněte zde.')
        cy.reload()
        setOtpions()
        cy.contains('Hledáte levnější letenku? Klikněte zde.')
    })

    it('Do not show minimalized after create and reload', function() {
        cy.visit(golUrlReturn)
        setOtpions({keepMinimalisedInDays: 0})
        cy.contains('Chcete hlídat cenu 2 000 CZK?')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvělé, hotovo. Až najdeme nižší cenu, pošleme Vám E-mail.')
        cy.get('.content button').click()
        cy.contains('Hledáte levnější letenku? Klikněte zde.')
        cy.reload()
        setOtpions({keepMinimalisedInDays: 0})
        cy.contains('Chcete hlídat cenu 2 000 CZK?')
    })
})
