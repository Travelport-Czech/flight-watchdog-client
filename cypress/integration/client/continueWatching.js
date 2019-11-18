import { setOtpions } from '../../support/helper'

const url = '?utm_flightWatchdogContinue=email@email.cz'

describe('Continue watching', function() {
    it('Success', function() {
        cy.visit('')
        setOtpions({ url })
        cy.contains('Hlídám cenu za\u00a0vás!')
        cy.contains('Chcete dál sledovat cenu tohoto letu?')
        cy.get('#flight-watchdog-window-continue-watching-clicked-ok').click()
        cy.contains('Skvěle, hotovo. Až najdeme nižší cenu, pošleme Vám e-mail.')
        cy.get('.content button').click()
        cy.get('.flight-watchdog-client_window').should('not.exist')
    })

    it('Cancel', function() {
        cy.visit('')
        setOtpions({ url })
        cy.contains('Hlídám cenu za\u00a0vás!')
        cy.contains('Chcete dál sledovat cenu tohoto letu?')
        cy.get('#flight-watchdog-window-continue-watching-clicked-cancel').click()
        cy.get('.flight-watchdog-client_window').should('not.exist')
    })
})
