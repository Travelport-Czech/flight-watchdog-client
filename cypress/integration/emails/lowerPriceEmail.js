import { normalizeText } from '../../support/helper'

describe('Lower Price Email', function () {
    it('Default', function () {
        cy.visit('/lowerPriceEmail')
        cy.get('tr')
            .eq(0)
            .should((tr) => {
                expect(normalizeText(tr.text()), 'header').to.equal(`\
Nalezli jsme lepší cenu letu, který jste hledali!\
Na základě Vašeho vytvoření upozornění na nižší cenu na webu https://example.cz, byl tento E-mail odeslán ihned po zjištění nižší ceny.\
z Praha (PRG+) do Londýn (LON) a zpět\
16. 12. 2018 až 25. 12. 2018\
`)
            })
        cy.get('tr')
            .eq(1)
            .should((tr) => {
                expect(normalizeText(tr.text()), 'content').to.equal(`\
Nalezli jsme cenu nižší o 1 000 CZK, což je o 17 % méně.\
Nalezená cena je\
5 000 CZK\
Původní cena byla 6 000 CZK\
Pro zobrazení letu na webu klikněte na tlačítko níže:\
Rezervovat\
19.9.\
20.9.\
21.9.\
22.9.\
23.9.\
4500500055006000650060004500581263215000\
Hlídaná cena\
Vývoj ceny\
Důležité: Sledování letu je ukončeno při nalezení nižší ceny. Pokud chcete cenu hlídat dál, potvrďte znovu hlídání letu:\
Hlídat dál\
Hlídání cen letů zajišťuje aplikace Flight Watchdog.\
`)
            })
        cy.screenshot()
    })
})
