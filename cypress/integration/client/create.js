import {golUrlReturn, golUrlOneway, setOtpions, normalizeText} from '../../support/helper'

const createButtonSelector = '#flight-watchdog-window-clicked-create-watcher'

describe('Create watcher', function() {
    it('Default success return flight', function() {
        cy.visit('/')
        setOtpions({url: golUrlReturn})
        cy.get('.flight-watchdog-client_window').should(($window) => {
            expect(normalizeText($window.text()), 'content').to.equal(`\
×Hlídám cenu za vás!\
Praha - Letište Václava Havla (PRG)\
Londýn (LON)\
a zpět\
1. 11. 2018 až 5. 11. 2018\
Hlídat cenu\
Odesláním potvrzuji, že souhlasím se zpracováním mých osobních údajů a že jsem se seznámil/a se Zásadami ochrany osobních údajů společnosti STUDENT AGENCY TRAVEL.`)
        })
        cy.screenshot()
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvěle, hotovo. Až najdeme nižší cenu, pošleme Vám e-mail.')
        cy.get('.content button').click()
        cy.get('.flight-watchdog-client_window').should('not.exist')
    })

    it('Default success oneway flight', function() {
        cy.visit('/')
        setOtpions({url: golUrlOneway})
        cy.get('.flight-watchdog-client_window').should(($window) => {
            expect(normalizeText($window.text()), 'content').to.equal(`\
×Hlídám cenu za vás!\
Praha - Letište Václava Havla (PRG)\
Londýn (LON)\
pouze tam\
1. 11. 2018\
Hlídat cenu\
Odesláním potvrzuji, že souhlasím se zpracováním mých osobních údajů a že jsem se seznámil/a se Zásadami ochrany osobních údajů společnosti STUDENT AGENCY TRAVEL.`)
        })
        cy.screenshot()
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvěle, hotovo. Až najdeme nižší cenu, pošleme Vám e-mail.')
        cy.get('.content button').click()
        cy.get('.flight-watchdog-client_window').should('not.exist')
    })

    it('Bad email', function() {
        cy.visit('/')
        setOtpions({url: golUrlReturn})
        cy.get('.flight-watchdog-client_window').should(($window) => {
            expect(normalizeText($window.text()), 'content').to.equal(`\
×Hlídám cenu za vás!\
Praha - Letište Václava Havla (PRG)\
Londýn (LON)\
a zpět\
1. 11. 2018 až 5. 11. 2018\
Hlídat cenu\
Odesláním potvrzuji, že souhlasím se zpracováním mých osobních údajů a že jsem se seznámil/a se Zásadami ochrany osobních údajů společnosti STUDENT AGENCY TRAVEL.`)
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
