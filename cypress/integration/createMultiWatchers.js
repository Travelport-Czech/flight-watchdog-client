import { golUrlReturn, setOtpions } from '../support/helper'

const createButtonSelector = '#flight-watchdog-window-clicked-create-watcher'

describe('Create watcher multiple', function() {
    it('Create success', function() {
        cy.visit(golUrlReturn)
        setOtpions()
        cy.contains('Chcete hlídat cenu 2 000 CZK?')
        cy.get('.content input').type('multiple@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvělé, hotovo. Až najdeme nižší cenu, pošleme Vám E-mail.')
        cy.get('.content button').click()
        cy.contains('Hledáte levnější letenku? Klikněte zde.')
    })

    it('Create with delete question', function() {
        cy.visit(golUrlReturn)
        setOtpions()
        cy.contains('Chcete hlídat cenu 2 000 CZK?')
        cy.get('.content input').type('multiplefull@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Na tento e-mail jste dosáhli limitu hlídačů. Pokud chcete sledovat tento let musíte smazat jeden z již existujících hlídačů. Na Váš e-mail vám byl odeslán seznam hlídačů, který můžete upravit.')
        cy.get('.content button').click()
        cy.contains('Hledáte levnější letenku? Klikněte zde.')
    })
})
