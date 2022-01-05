import { golUrlReturn, setOptions } from '../../support/helper'

const createButtonSelector = '#flight-watchdog-window-clicked-create-watcher'

describe('Minimalize', function () {
    it('Show minimalized after create and reload', function () {
        cy.visit(golUrlReturn)
        setOptions()
        cy.contains('Chcete hlídat cenu 2 000 Kč?')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvěle, hotovo. Až najdeme nižší cenu, pošleme Vám e-mail.')
        cy.get('.content button').click()
        cy.contains('Hledáte levnější letenku? Klikněte zde.')
        cy.reload()
        setOptions()
        cy.contains('Hledáte levnější letenku? Klikněte zde.')
    })

    it('Do not show minimalized after create and reload', function () {
        cy.visit(golUrlReturn)
        setOptions({ keepMinimalisedInDays: 0 })
        cy.contains('Chcete hlídat cenu 2 000 Kč?')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvěle, hotovo. Až najdeme nižší cenu, pošleme Vám e-mail.')
        cy.get('.content button').click()
        cy.contains('Hledáte levnější letenku? Klikněte zde.')
        cy.reload()
        setOptions({ keepMinimalisedInDays: 0 })
        cy.contains('Chcete hlídat cenu 2 000 Kč?')
    })
})
