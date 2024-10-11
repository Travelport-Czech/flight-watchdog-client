import { normalizeText } from '../../support/helper'

describe('Marketing Email', function () {
    it('Default', function () {
        cy.visit('/marketingEmail')
        cy.get('tr')
            .eq(0)
            .should((tr) => {
                expect(normalizeText(tr.text()), 'header').to.equal(`\
Vývoj cen hlídačů letů\
Tento e-mail je odesílán každý den na základě Vašeho založení hlídače letu na webu https://example.cz.\
`)
            })
        cy.get('tr')
            .eq(1)
            .should((tr) => {
                expect(normalizeText(tr.text()), 'content').to.equal(`\
z Praha (PRG+) do Londýn (LON) a zpět\
16. 12. 2018 až 25. 12. 2018\
19.9.20.9.21.9.22.9.23.9.4500500055006000650060004500581263215000\
Hlídaná cena\
Vývoj cenyLimit ceny 6 000 Kč\
Rezervovat\
Přestat sledovat\
Podobné nabídky (lidé právě kupují)\
3 500 Kč - 16. 12. 2018 až 25. 12. 2018 -> Zobrazit\
3 500 Kč - 16. 12. 2018 až 25. 12. 2018 -> Zobrazit\
3 500 Kč - 16. 12. 2018 až 25. 12. 2018 -> Zobrazit\
z Praha (PRG+) do Londýn (LON) a zpět\
16. 12. 2018 až 25. 12. 2018\
19.9.20.9.21.9.22.9.23.9.4500500055006000650060004500581263215000\
Hlídaná cena\
Vývoj ceny\
Limit ceny 6 000 Kč\
Rezervovat\
Přestat sledovat\
Podobné nabídky (lidé právě kupují)\
3 500 Kč - 16. 12. 2018 až 25. 12. 2018 -> Zobrazit\
3 500 Kč - 16. 12. 2018 až 25. 12. 2018 -> Zobrazit\
3 500 Kč - 16. 12. 2018 až 25. 12. 2018 -> Zobrazit\
Hlídání cen letů zajišťuje aplikace Flight Watchdog.\
`)
            })
        cy.get('a')
            .eq(3)
            .then((element) => {
                expect(element.attr('href')).to.equal(
                    'https://example.cz/results?departureDate=2018-12-16&to=LON&from=PRG&lang=cs&ADT=1&toleranceDays=0&returnDate=2018-12-25&flightWatchdogAdditionalResult=',
                )
            })
        cy.screenshot()
    })
})
