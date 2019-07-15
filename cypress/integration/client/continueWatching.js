import { setOtpions } from '../../support/helper'

const url = '?utm_flightWatchdogContinue=email@email.cz'

describe('Continue watching', function() {
    it('Success', function() {
        cy.visit('')
        setOtpions({ url })
        cy.contains('Chcete hlídat cenu 2\u00a0000\u00a0CZK?')
        cy.contains('Chcete dál sledovat cenu tohoto letu?')
        cy.get('#flight-watchdog-window-continue-watching-clicked-ok').click()
        cy.contains('Skvěle, hotovo. Až najdeme nižší cenu, pošleme Vám e-mail.')
        cy.get('.content button').click()
        cy.contains('Hledáte levnější letenku? Klikněte zde.')
    })

    it('Cancel', function() {
        cy.visit('')
        setOtpions({ url })
        cy.contains('Chcete hlídat cenu 2\u00a0000\u00a0CZK?')
        cy.contains('Chcete dál sledovat cenu tohoto letu?')
        cy.get('#flight-watchdog-window-continue-watching-clicked-cancel').click()
        cy.contains('Hledáte levnější letenku? Klikněte zde.')
    })
})
