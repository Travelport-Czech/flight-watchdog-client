import { normalizeText} from '../../support/helper'

describe('Watcher List Email', function() {
    it('Default', function() {
        cy.visit('/watcherListEmail')
        cy.get('tr').eq(0).should((tr) => {
            expect(`\
Seznam hlídačů letů\
Tento e-mail byl odeslán na základě Vašeho požadavku na smazání hlídače letu na webu https://example.cz. Po kliknutí na tlačítko Smazat budete přesměrováni na výsledky vyhledávání daného letu a budete vyzváni k potrvzení smazání.\
Londýn (LON)Praha (PRG)\
a zpět\
16. 12. 2018 až 25. 12. 2018\
19.9.20.9.21.9.22.9.23.9.4500500055006000650060004500581263215000\
Hlídaná cenaVývoj ceny\
Limit ceny 6000 CZK\
Rezervovat \
Smazat\
Podobné nabídky (lidé právě kupují)\
3 500 CZK - 16. 12. 2018 až 25. 12. 2018 -> Zobrazit\
3 500 CZK - 16. 12. 2018 až 25. 12. 2018 -> Zobrazit\
3 500 CZK - 16. 12. 2018 až 25. 12. 2018 -> Zobrazit\
Londýn (LON)Praha (PRG)\
a zpět\
16. 12. 2018 až 25. 12. 2018\
19.9.20.9.21.9.22.9.23.9.4500500055006000650060004500581263215000\
Hlídaná cenaVývoj ceny\
Limit ceny 6000 CZK\
Rezervovat \
Smazat\
Podobné nabídky (lidé právě kupují)\
3 500 CZK - 16. 12. 2018 až 25. 12. 2018 -> Zobrazit\
3 500 CZK - 16. 12. 2018 až 25. 12. 2018 -> Zobrazit\
3 500 CZK - 16. 12. 2018 až 25. 12. 2018 -> Zobrazit\
Hlídání cen letů zajišťuje aplikace Flight Watchdog.\
`, 'header')
            .to.equal(normalizeText(tr.text()))
        })
    })
})
