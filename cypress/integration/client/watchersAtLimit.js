import {setOtpions, normalizeText} from '../../support/helper'

const createButtonSelector = '#flight-watchdog-window-clicked-create-watcher'

describe('Watchers at limit', function() {
    it('Should disable after create', function() {
        cy.visit('/')
        setOtpions({token: 'tokenLimit'})
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

    it('Should disable after check limit', function() {
        cy.visit('/')
        setOtpions({token: 'tokenLimitZero'})
        cy.get('#flight-watchdog-client-app').should(($window) => {
            expect($window.text(), 'content').to.equal('')
        })
    })
})
