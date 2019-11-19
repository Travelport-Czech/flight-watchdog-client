import { setOtpions } from '../../support/helper'

const createButtonSelector = '#flight-watchdog-window-clicked-create-watcher'

describe('Create watcher multiple', function() {
    it('Create success', function() {
        cy.visit('')
        setOtpions()
        cy.contains('Hlídám cenu za\u00a0vás!')
        cy.get('.content input').type('multiple@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvěle, hotovo. Až najdeme nižší cenu, pošleme Vám e-mail.')
        cy.get('.content button').click()
        cy.get('.flight-watchdog-client_window').should('not.exist')
    })

    it('Create with delete question', function() {
        cy.visit('')
        setOtpions()
        cy.contains('Hlídám cenu za\u00a0vás!')
        cy.get('.content input').type('multiplefull@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Na tento e-mail jste dosáhli limitu hlídačů. Pokud chcete sledovat tento let musíte smazat jeden z již existujících hlídačů. Na Váš e-mail vám byl odeslán seznam hlídačů, který můžete upravit.')
        cy.get('.content button').click()
        cy.get('.flight-watchdog-client_window').should('not.exist')
    })
})
