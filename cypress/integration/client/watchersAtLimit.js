import {golUrlReturn, setOtpions, normalizeText} from '../../support/helper'

const createButtonSelector = '#flight-watchdog-window-clicked-create-watcher'

describe('Watchers at limit', function() {
    it('Should disable after create', function() {
        cy.visit('/')
        setOtpions({token: 'tokenLimit', url: golUrlReturn})
        cy.get('.flight-watchdog-client_window').should(($window) => {
            expect(normalizeText($window.text()), 'content').to.equal(`\
×Chcete hlídat cenu 2 000 CZK?\
Budeme ji hlídat za Vás! Každý den pak dostanete informaci o jejím vývoji.\
z Praha - Letište Václava Havla (PRG) do Londýn (LON) a zpět\
1. 11. 2018 až 5. 11. 2018\
Hlídat Nemám zájem`)
        })
        cy.screenshot()
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvěle, hotovo. Až najdeme nižší cenu, pošleme Vám e-mail.')
        cy.get('.content button').click()
        cy.get('#flight-watchdog-client-app').should(($window) => {
            expect($window.text(), 'content').to.equal('')
        })
    })

    it('Should disable after check limit', function() {
        cy.visit('/')
        setOtpions({token: 'tokenLimitZero', url: golUrlReturn})
        cy.get('#flight-watchdog-client-app').should(($window) => {
            expect($window.text(), 'content').to.equal('')
        })
    })
})
