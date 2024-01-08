const users = require("../fixtures/users.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
import { faker } from "@faker-js/faker";

describe("user can create a box and run it", () => {
  //пользователь 1 логинится
  //пользователь 1 создает коробку
  //пользователь 1 получает приглашение
  //пользователь 2 переходит по приглашению
  //пользователь 2 заполняет анкету
  //пользователь 3 переходит по приглашению
  //пользователь 3 заполняет анкету
  //пользователь 4 переходит по приглашению
  //пользователь 4 заполняет анкету
  //пользователь 1 логинится
  //пользователь 1 запускает жеребьевку
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;

  it("user logins and create a box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.wait(5000); // добавляем задержку в 5 секунд для ожидания загрузки страницы
    cy.contains("Создать коробку").should("be.visible"); // проверяем, что элемент отображается на странице
    cy.contains("Создать коробку").click();
    cy.wait(10000);
    cy.get(boxPage.boxNameField)
      .type(newBoxName)
      .should("have.value", newBoxName);
    cy.get(boxPage.boxNameField)
      .invoke("val", newBoxName) // сохраняем значение в переменную
      .as("newBoxName"); // сохраняем значение в контекст Cypress
    cy.get(generalElements.arrowRight).click();
    cy.wait(10000);
    cy.get(boxPage.sixthIcon).click();
    cy.get(generalElements.arrowRight).click();
    cy.wait(10000);
    cy.get(boxPage.giftPriceToggle).check({ force: true });
    cy.get(boxPage.maxAnount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.checkAddress).should("have.text", "Почтовый адрес");
    cy.get(boxPage.checkPhoneNumber).should("have.text", "Номер телефона");
    cy.get(generalElements.arrowRight).click();
    cy.get(dashboardPage.createdBoxName).should("have.text", `${newBoxName}`);
    cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Участники");
        expect(text).to.include("Моя карточка");
        expect(text).to.include("Подопечный");
      });
      });

  it("add participants", () => {
    cy.get(generalElements.addParticipantsButton).click();
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });
    cy.clearCookies();
  });

  it("approve as user1", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.addParticipantsButton).click();
    cy.contains("войдите").click();
    cy.login(users.user1.email, users.user1.password);
    cy.contains("Создать карточку участника").should("exist");
    cy.get(generalElements.addParticipantsButton).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  });
  it("add  user2 and user3", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.get(
      "#root > div.layout-1 > section.layout-1__header-wrapper-fixed > header > section > div > div > a:nth-child(1)"
    ).click();
    cy.contains(`${newBoxName}`, { timeout: 1000 }).click();
    cy.get(
      ".layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button > .toggle-menu-button--inner"
    ).click();
    cy.contains("Добавить участников").click({ force: true });
    cy.get(invitePage.sandingInvitation).check({ force: true });
    cy.get(".MuiGrid-container").then((container) => {
      const children = container.children();
      const childrenArray = Array.from(children);
      const userKeys = Object.keys(users);
      const slicedKeys = userKeys.slice(2);
      for (let i = 0; i < childrenArray.length; i++) {
        cy.get(
          `:nth-child(${i * 2 + 1}) > .frm-wrapper > #input-table-${i}`
        ).type(users[slicedKeys[i]].name);
        cy.get(
          `:nth-child(${i * 2 + 2}) > .frm-wrapper > #input-table-${i}`
        ).type(users[slicedKeys[i]].email);
      }
    });
    cy.get(invitePage.inviteUserButton).click();
    cy.wait(10000);
    cy.get(
      ".layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button > .toggle-menu-button--inner"
    ).click();
    cy.get(
      ".layout-1__header-wrapper-fixed > .layout-1__header-secondary__menu > .header-secondary-menu > .organizer-menu > .organizer-menu__wrapper > :nth-child(2)"
    ).click({ force: true });
    cy.get(".btn-main").click();
    cy.get(".santa-modal_content_buttons > .btn-main").click();
    cy.get(".picture-notice__title").should(
      "have.text",
      "Жеребьевка проведена"
    );
    cy.clearCookies();
  });

  // after("delete box", () => {
  //   cy.visit("/login");
  //   cy.login(users.userAutor.email, users.userAutor.password);
  //   cy.contains("Коробки").click({ force: true });
  //   // cy.get(
  //   //   "#root > div.layout-1 > section.layout-1__header-wrapper-fixed > header > section > div > div > a:nth-child(1)"
  //   // ).click();
  //   cy.contains(newBoxName, { timeout: 1000 }).click({ force: true });
  //   // cy.get(":nth-child(1) > a.base--clickable > .user-card").first().click();
  //   cy.get(
  //     ".layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button > .toggle-menu-button--inner"
  //   ).click();
  //   cy.contains("Архивация и удаление").click({ force: true });
  //   cy.get(":nth-child(2) > .form-page-group__main > .frm-wrapper > .frm").type(
  //     "Удалить коробку"
  //   );
  //   cy.get(".btn-service").click();
  // });
});
