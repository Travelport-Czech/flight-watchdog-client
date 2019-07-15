import { setOtpions } from '../../support/helper'

const url = '?utm_flightWatchdogDelete=generate-0000-0000-0000-000000000001&utm_email=email@email.cz'

describe('Delete watcher', function() {
    it('Success delete', function() {
        cy.visit('')
        setOtpions({ url })
        cy.contains('Chcete hlídat cenu 2\u00a0000\u00a0CZK?')
        cy.contains('Opravdu chcete hlídač smazat?')
        cy.get('#flight-watchdog-window-clicked-delete-by-id-yes').click()
        cy.contains('Hlídat')
    })
})
