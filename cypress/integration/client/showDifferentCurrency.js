import {golUrlReturn, setOtpions} from '../../support/helper'

describe('Show different currency', function() {
    it('Create return flight', function() {
        cy.visit('/')
        setOtpions({url: golUrlReturn, defaultPrice: '5 000 CZK', price: '250 EUR'})
        cy.screenshot()
        cy.contains('Chcete hlídat cenu 5\u00a0000\u00a0CZK (250\u00a0EUR)?')
    })
})
