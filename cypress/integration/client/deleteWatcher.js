import { golUrlReturn, setOtpions } from '../../support/helper'

const url = golUrlReturn + '&flightWatchdogDelete=generate-0000-0000-0000-000000000001&email=email@email.cz'

describe('Delete watcher', function() {
    it('Success delete', function() {
        cy.visit('')
        setOtpions({ url })
        cy.contains('Hlídám cenu za\u00a0vás!')
        cy.contains('Opravdu chcete hlídač smazat?')
        cy.get('#flight-watchdog-window-clicked-delete-by-id-yes').click()
        cy.contains('Hlídat')
    })
})
