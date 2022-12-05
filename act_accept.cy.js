import ActCreatePage from "../../pages/act_create_page";

const actCreatePage = new ActCreatePage()

describe('Test Act Accept', () => {
    it('Should Accept', () => {
        let document_number = Math.floor(Math.random() * 1000);
        cy.certLogin('sender')
        actCreatePage.act_create(document_number)
        actCreatePage.send_document()
        actCreatePage.test_document_send(document_number)
        cy.certLogin('receiver')
        actCreatePage.test_document_received(document_number)
        actCreatePage.accept_act()
        actCreatePage.test_status_bar_accepted()
        actCreatePage.test_document_status_accepted()
    })
})