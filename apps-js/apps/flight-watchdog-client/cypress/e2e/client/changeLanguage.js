import { golUrlReturn, setOptions } from '../../support/helper'

const createButtonSelector = '#flight-watchdog-window-clicked-create-watcher'

describe('Change language', function () {
    it('en', function () {
        cy.visit(golUrlReturn)
        setOptions({ lang: 'en' })
        cy.contains('Track the price 2 000 CZK?')
        cy.contains('Prague')
        cy.contains('London')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Done. When we find a lower price, we will send you an email.')
        cy.get('.content button').click()
        cy.contains('Looking for a cheaper flight? Click here.')
    })

    it('al', function () {
        cy.visit(golUrlReturn)
        setOptions({ lang: 'al' })
        cy.contains('Gjurmo çmimin 2 000 CZK?')
        cy.contains('Prague')
        cy.contains('London')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('U kry. Kur të kemi një cmim më të lirë, do njoftoheni në e-mail.')
        cy.get('.content button').click()
        cy.contains('Po kërkoni një fluturim më të lirë? Klikoni këtu.')
    })

    it('sk', function () {
        cy.visit(golUrlReturn)
        setOptions({ lang: 'sk' })
        cy.contains('Chcete sledovať cenu 2 000 CZK?')
        cy.contains('Prague')
        cy.contains('London')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvelé, hotovo! Až nájdeme nižšiu cenu, pošleme Vám e-mail.')
        cy.get('.content button').click()
        cy.contains('Hľadáte lacnejšiu letenku? Kliknite sem.')
    })

    it('vi', function () {
        cy.visit(golUrlReturn)
        setOptions({ lang: 'vi' })
        cy.contains('Bạn muốn theo dõi giá 2 000 CZK?')
        cy.contains('Prague')
        cy.contains('London')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Làm xong. Khi chúng tôi tìm thấy giá thấp hơn, chúng tôi sẽ gửi email cho bạn.')
        cy.get('.content button').click()
        cy.contains('Bạn đang tìm một chuyến bay rẻ hơn? Bấm vào đây.')
    })

    it('sr', function () {
        cy.visit(golUrlReturn)
        setOptions({ lang: 'sr', price: '7.125,00 RSD' })
        cy.contains('Pratite bolju cenu od 7.125,00 RSD?')
        cy.contains('Prague')
        cy.contains('London')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Dogovoreno. Čim nađemo povoljniju cenu poslaćemo Vam e-poruku.')
        cy.get('.content button').click()
        cy.contains('Tražite jeftiniji let? Kliknite ovde.')
    })

    it('en but RSD currency, should shows price format as for sr lang', function () {
        cy.visit(golUrlReturn)
        setOptions({ lang: 'en', price: '7.125,00 RSD' })
        cy.contains('Track the price 7.125,00 RSD?')
        cy.contains('Prague')
        cy.contains('London')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Done. When we find a lower price, we will send you an email.')
        cy.get('.content button').click()
        cy.contains('Looking for a cheaper flight? Click here.')
    })
})
