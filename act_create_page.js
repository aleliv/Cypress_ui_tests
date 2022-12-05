import BasePage from "./base_page";
import {actPageLocators, basePageLocators, utdPageLocators} from "./locators";


class ActCreatePage extends BasePage {
    act_create(document_number){
        //Открыть форму создания акта
        cy.get(basePageLocators.NEW_DOCUMENT_BUTTON).click()
        cy.get(basePageLocators.CREATE_ACT_BUTTON).click()
        //ЗАПОЛНЕНИЕ ФОРМЫ АКТА
        //Номер и Дата
        cy.get(basePageLocators.DOCUMENT_NUMBER).type(String(document_number))
        cy.get(basePageLocators.DOCUMENT_DATE).type(this.today()).type('{enter}')
        //Заголовок
        cy.get(actPageLocators.HEADER).type(this.makeid(10))
        //Исполнитель
        //Заказчик
        cy.get(actPageLocators.RECEIVER).type(Cypress.env('buyer'), {delay: 200})
        cy.get(actPageLocators.RECEIVER_SELECT).click()
        //Валюта
        //Таблица
        cy.get(actPageLocators.GOODS_NAME).type(this.makeid(5))
        cy.get(actPageLocators.DESCRIPTION).type(this.makeid(5))
        cy.get(actPageLocators.MEASUREMENT).type('штука', {delay: 200})
        cy.get(actPageLocators.MEASUREMENT_SELECT).click()
        cy.get(actPageLocators.COUNT).type(this.random_number(100))
        cy.get(actPageLocators.PRICE).type(this.random_number(100))
        cy.get(actPageLocators.TAXRATE).click()
        cy.get(actPageLocators.TAXRATE_SELECT).click()
        cy.get(actPageLocators.INFO_FIELD).type(this.makeid(5))
        //ИД гос онтракта
        cy.get(actPageLocators.GOS_ID).type(this.random_number(1000))
        //Содержание операции
        cy.get(actPageLocators.SODER_OPER).type(this.makeid(5))
        //Сохранить
        cy.get(actPageLocators.SAVE_ACT_BUTTON).click()

        //Обновление страницы, потом удалить
        // cy.wait(1000)
        // cy.reload()

    }

    accept_act(){
        cy.visit('/documents/inbox')
        cy.get(basePageLocators.INOUT_DOCUMENT_NUMBER).click()
        cy.findAllByText(basePageLocators.ACCEPT_DOCUMENT_BUTTON).first().click()
        cy.get(actPageLocators.ACCEPT_DATE).type(this.today()).type('{enter}')
        cy.get(actPageLocators.ACCEPT_TEXT).type('Принято')
        cy.get(actPageLocators.ACCEPT_BUTTON).click()
    }
}

export default ActCreatePage