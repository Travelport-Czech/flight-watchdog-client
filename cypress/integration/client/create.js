import {golUrlReturn, golUrlOneway, setOtpions, normalizeText} from '../../support/helper'

const createButtonSelector = '#flight-watchdog-window-clicked-create-watcher'

describe('Create watcher', function() {
    it('Default success return flight', function() {
        cy.visit('/')
        setOtpions({url: golUrlReturn})
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
        cy.contains('Hledáte levnější letenku? Klikněte zde.')
    })

    it('Default success oneway flight', function() {
        cy.visit('/')
        setOtpions({url: golUrlOneway})
        cy.get('.flight-watchdog-client_window').should(($window) => {
            expect(normalizeText($window.text()), 'content').to.equal(`\
×Chcete hlídat cenu 2 000 CZK?\
Budeme ji hlídat za Vás! Každý den pak dostanete informaci o jejím vývoji.\
z Praha - Letište Václava Havla (PRG) do Londýn (LON)\
1. 11. 2018\
Hlídat Nemám zájem`)
        })
        cy.screenshot()
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvěle, hotovo. Až najdeme nižší cenu, pošleme Vám e-mail.')
        cy.get('.content button').click()
        cy.contains('Hledáte levnější letenku? Klikněte zde.')
    })

    it('Bad email', function() {
        cy.visit('/')
        setOtpions({url: golUrlReturn})
        cy.get('.flight-watchdog-client_window').should(($window) => {
            expect(normalizeText($window.text()), 'content').to.equal(`\
×Chcete hlídat cenu 2 000 CZK?\
Budeme ji hlídat za Vás! Každý den pak dostanete informaci o jejím vývoji.\
z Praha - Letište Václava Havla (PRG) do Londýn (LON) a zpět\
1. 11. 2018 až 5. 11. 2018\
Hlídat Nemám zájem`)
        })
        cy.get('.content input').type('michal')
        cy.get(createButtonSelector).click()
        cy.contains('E-mail nemá správný formát')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvěle, hotovo. Až najdeme nižší cenu, pošleme Vám e-mail.')
    })

    it('Return flight url with lower case step', function() {
        cy.visit('/')
        setOtpions({url: golUrlReturn.replace('ChooseFromFour', 'chooseFromFour')})
        cy.contains('Chcete hlídat cenu 2\u00a0000\u00a0CZK?')
    })

    it('Oneway flight url with lower case step', function() {
        cy.visit('/')
        setOtpions({url: golUrlOneway.replace('ChooseFromFour', 'chooseFromFour')})
        cy.contains('Chcete hlídat cenu 2\u00a0000\u00a0CZK?')
    })
})
