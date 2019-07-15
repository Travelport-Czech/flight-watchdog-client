import { setOtpions } from '../../support/helper'

const createButtonSelector = '#flight-watchdog-window-clicked-create-watcher'

describe('Minimalize', function() {
    it('Show minimalized after create and reload', function() {
        cy.visit('')
        setOtpions()
        cy.contains('Chcete hlídat cenu 2\u00a0000\u00a0CZK?')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvěle, hotovo. Až najdeme nižší cenu, pošleme Vám e-mail.')
        cy.get('.content button').click()
        cy.contains('Hledáte levnější letenku? Klikněte zde.')
        cy.reload()
        setOtpions()
        cy.contains('Hledáte levnější letenku? Klikněte zde.')
    })

    it('Do not show minimalized after create and reload', function() {
        cy.visit('')
        setOtpions({keepMinimalisedInDays: 0})
        cy.contains('Chcete hlídat cenu 2\u00a0000\u00a0CZK?')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvěle, hotovo. Až najdeme nižší cenu, pošleme Vám e-mail.')
        cy.get('.content button').click()
        cy.contains('Hledáte levnější letenku? Klikněte zde.')
        cy.reload()
        setOtpions({keepMinimalisedInDays: 0})
        cy.contains('Chcete hlídat cenu 2\u00a0000\u00a0CZK?')
    })
})
