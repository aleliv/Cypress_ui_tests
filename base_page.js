import {basePageLocators, utdPageLocators} from "./locators";

class BasePage{
    send_document(){
        cy.wait(2000)
        cy.get(basePageLocators.SEND_DOCUMENT_BUTTON).should('be.visible').click()
        // cy.get(basePageLocators.SEND_DOCUMENT_CONFIRM).should('be.visible').click()
        cy.wait(2000)
    }

    test_draft_page(){
        cy.get(basePageLocators.DRAFT_STATE).contains('Черновик').should('be.visible')
        cy.url().should('include', '/document')

    }

    create_new_utd(){
        cy.get(basePageLocators.NEW_DOCUMENT_BUTTON).click()
        cy.get(basePageLocators.CREATE_UTD_BUTTON).click()
    }

    create_new_unformalized(){
        cy.get(basePageLocators.NEW_DOCUMENT_BUTTON).click()
        cy.get(basePageLocators.CREATE_UNFORMALIZED_BUTTON).click()
    }

    go_to_cabinet(){
        cy.get('div#header li:nth-child(2) > a > i').click()
        cy.url().should('include', '/cabinet')
    }

    logout(){
        cy.get('.logout').click()
    }

    random_number(max){
        return Math.floor(Math.random() * max);
    }

    today(){
        let date = new Date();
        return date.getDate() + "."
            + (date.getMonth() + 1) + "."
            + date.getFullYear()
    }

    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    test_document_send(document_number){
        cy.visit('/documents/outbox')
        cy.get(basePageLocators.INOUT_DOCUMENT_NUMBER).should('include.text', document_number)
        cy.get(utdPageLocators.INOUT_STATUS).should('have.text', 'Ожидание подписания')
    }

    test_unilateral_document_send(document_number){
        cy.visit('/documents/outbox')
        cy.get(basePageLocators.INOUT_DOCUMENT_NUMBER).should('include.text', document_number)
        cy.get(utdPageLocators.INOUT_STATUS).should('have.text', 'Ожидается извещение о получении')
    }

    test_status_bar_declined(){
        cy.get(basePageLocators.STATUS_BAR).should('include.text', 'Документ отклонен')
    }

    test_document_status_declined(){
        cy.visit('/documents/inbox')
        cy.get(basePageLocators.DOCUMENT_STATUS).should('have.text', 'Документооборот отклонён')
    }

    test_status_bar_accepted(){
        cy.get(basePageLocators.STATUS_BAR).should('have.text', 'Документооборот завершен')
    }

    test_document_status_accepted(){
        cy.visit('/documents/inbox')
        cy.get(basePageLocators.DOCUMENT_STATUS).should('have.text', 'Документооборот завершён')
    }

    test_document_received(document_number){
        cy.wait(3000)
        cy.visit('/documents/inbox')
        cy.get(basePageLocators.INOUT_DOCUMENT_NUMBER).should('include.text.text', document_number)
    }

    test_unilateral_document_received(document_number){
        cy.wait(3000)
        cy.visit('/documents/inbox')
        cy.get(basePageLocators.INOUT_DOCUMENT_NUMBER).should('include.text.text', document_number)
        status_check(basePageLocators.DOCUMENT_STATUS)
        cy.get(basePageLocators.DOCUMENT_STATUS).should('have.text', 'Документооборот завершён')
        cy.get(basePageLocators.INOUT_DOCUMENT_NUMBER).click()
        cy.get(basePageLocators.STATUS_BAR).should('have.text', 'Документооборот завершен')
    }
}

export function status_check(locator) {
    cy.get(locator).then((txt) => {
        if (txt.text() === 'Документооборот завершён') {
            cy.log(txt.text())
        } else {
            cy.log('Обновление страницы...')
            cy.wait(3000)
            cy.reload()
            cy.get(locator).then((txt)=>{
                if (txt.text() === 'Документооборот завершён'){
                    cy.log(txt.text())
                } else {
                    cy.log('Обновление страницы...')
                    cy.wait(3000)
                    cy.reload()
                    cy.get(locator).then((txt)=>{
                        if (txt.text() === 'Документооборот завершён'){
                            cy.log(txt.text())
                        }
                    })
                }
            })
        }
    })
}
export default BasePage