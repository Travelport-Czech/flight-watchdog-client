import { golUrlReturn, setOtpions } from '../../support/helper'

const createButtonSelector = '#flight-watchdog-window-clicked-create-watcher'

describe('Change language', function () {
    it('en', function () {
        cy.visit(golUrlReturn)
        setOtpions({ lang: 'en' })
        cy.contains('Track the price 2 000 CZK?')
        cy.contains('Prague - Ruzyne')
        cy.contains('London')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Done. When we find a lower price, we will send you an email.')
        cy.get('.content button').click()
        cy.contains('Looking for a cheaper flight? Click here.')
    })

    it('al', function () {
        cy.visit(golUrlReturn)
        setOtpions({ lang: 'al' })
        cy.contains('Gjurmo çmimin 2 000 CZK?')
        cy.contains('Prague - Ruzyne')
        cy.contains('London')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('U kry. Kur të kemi një cmim më të lirë, do njoftoheni në e-mail.')
        cy.get('.content button').click()
        cy.contains('Po kërkoni një fluturim më të lirë? Klikoni këtu.')
    })

    it('sk', function () {
        cy.visit(golUrlReturn)
        setOtpions({ lang: 'sk' })
        cy.contains('Chcete sledovať cenu 2 000 CZK?')
        cy.contains('Prague - Ruzyne')
        cy.contains('London')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Skvelé, hotovo! Až nájdeme nižšiu cenu, pošleme Vám e-mail.')
        cy.get('.content button').click()
        cy.contains('Hľadáte lacnejšiu letenku? Kliknite sem.')
    })

    it('vi', function () {
        cy.visit(golUrlReturn)
        setOtpions({ lang: 'vi' })
        cy.contains('Bạn muốn theo dõi giá 2 000 CZK?')
        cy.contains('Prague - Ruzyne')
        cy.contains('London')
        cy.get('.content input').type('michal@email.cz')
        cy.get(createButtonSelector).click()
        cy.contains('Làm xong. Khi chúng tôi tìm thấy giá thấp hơn, chúng tôi sẽ gửi email cho bạn.')
        cy.get('.content button').click()
        cy.contains('Bạn đang tìm một chuyến bay rẻ hơn? Bấm vào đây.')
    })
})
