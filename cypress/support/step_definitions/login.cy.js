import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import "@shelex/cypress-allure-plugin";
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");
const users = require("../../fixtures/users.json");
const boxPage = require("../../fixtures/pages/boxPage.json");
const generalElements = require("../../fixtures/pages/general.json");
const invitePage = require("../../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../../fixtures/pages/inviteeDashboardPage.json");
let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
let maxAmount = 50;
let currency = "Евро";
let inviteLink;
let newBoxId;
let randomPhone = faker.phone.number();

Given("user is on secret santa login page", function () {
  cy.visit("/login");
});
//   Given("user logs in", function () {
//     cy.login(users.userAutor.email, users.userAutor.password);
//   });'
// Given("user logs in as {string} and {string}", function (login, password) { //сюда приходит из examples
//   cy.login(login, password);
// });  //след шаг преобразует в табл
Given("user logs in with table", function (dataTable) {
  // //     // cy.log(dataTable.hashes()); показывает и логин и пароль
  // //     //cy.log(dataTable.hashes()[0].login); //получаем только логин,  обращаемся к нулевому элементу массива
  // //     //cy.log(dataTable.hashes()[0].password); //получаем только пароль,  обращаемся к нулевому элементу массива
  cy.login(dataTable.hashes()[0].login, dataTable.hashes()[0].password); // тут используем верхние записи и логинимся с ними
});
Given("user is on dashboard page", function () {
  cy.contains("Создать коробку").click();
});
When("title have text Come up with box name", function () {
  cy.get(boxPage.firstTitle).should("have.text", "Придумайте название коробке");
});
When("naming a box", function () {
  cy.get(boxPage.boxNameField)
    .type(newBoxName)
    .should("have.value", newBoxName);
  cy.get(boxPage.boxNameField).invoke("val", newBoxName).as("newBoxName");
});
When("save new box id", function () {
  cy.get(boxPage.boxIdField)
    .invoke("val")
    .then((value) => {
      newBoxId = value;
    });
});
When("user is on cover selection page", function () {
  cy.get(generalElements.arrowRight).click();
});
When("user select a cover box", function () {
  cy.get(boxPage.sixthIcon).click();
});
When("user is on gift price toggle page", function () {
  cy.get(generalElements.arrowRight).click();
});
When("checkbox on", function () {
  cy.get(boxPage.giftPriceToggle).check({ force: true });
});
When("user sets the max gift amount", function () {
  cy.get(boxPage.maxAmount).type(maxAmount);
});
When("user select currency", function () {
  cy.get(boxPage.currency).select(currency);
});
When("user is on advanced setting page", function () {
  cy.get(generalElements.arrowRight).click();
});
When("select advanced setting on page", function () {
  cy.get(boxPage.checkBoxWishes).should("be.checked");
  cy.get(boxPage.Address).should("have.text", "Почтовый адрес");
  cy.get(boxPage.checkBoxAddress).check({ force: true });
  cy.get(boxPage.phoneNumber).should("have.text", "Номер телефона");
  cy.get(boxPage.checkBoxPhoneNumber).check({ force: true });
  cy.get(boxPage.checkBoxNameParticipant).should("be.checked");
});
When("user is on new box page", function () {
  cy.get(generalElements.arrowRight).click();
});
Then("check name new box on the page", function () {
  cy.get(dashboardPage.createdBoxName).should("have.text", `${newBoxName}`);
});
Then("check title on the new box  page", function () {
  cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
    .invoke("text")
    .then((text) => {
      expect(text).to.include("Участники");
      expect(text).to.include("Моя карточка");
      expect(text).to.include("Подопечный");
    });
});
Then("user is on add participants page", function () {
  cy.get(generalElements.addParticipantsButton).click();
});
Then("copy link", function () {
  cy.get(invitePage.inviteLink)
    .invoke("text")
    .then((link) => {
      inviteLink = link;
    });
});
Then("log out", function () {
  cy.clearCookies();
});
Given("following a link", function () {
  cy.visit(inviteLink);
});
Given(
  "user logs through click on the create participant card button",
  function () {
    cy.get(generalElements.addParticipantsButton).click();
  }
);
Given("user on login page", function () {
  cy.contains("войдите").click();
});
Given("user logs", function (dataTable) {
  cy.login(dataTable.hashes()[1].login, dataTable.hashes()[1].password); // тут используем верхние записи и логинимся с ними
});
Given("user create participant card", function () {
  cy.get(generalElements.addParticipantsButton).click();
});
Given("field name have val userName1", function (dataTable) {
  cy.get(inviteeBoxPage.nameField).should(
    "have.value",
    dataTable.hashes()[1].name
  );
});
Given("add phone", function () {
  cy.get(inviteeBoxPage.numberPhoneField).type(randomPhone);
});
Given("user select avatar", function () {
  cy.get(generalElements.arrowRight).click();
  cy.get(inviteeBoxPage.selectCoverCard)
    .find(".picture_svg_wrapper") // находим все изображения внутри элемента
    .eq(Math.floor(Math.random() * 31))
    .then((card) => {
      //выбор рандомного изображения
      if (card.index() === 30) {
        //при клике на 31 эл генерируем картинку
        const imageAvatar = faker.image.avatar();
        imageElement.src = imageAvatar;
        imageElement.alt = "Random Image";
        // const imageElement = <img src={imageAvatar} alt="Random Image"/>;
        card.append(imageElement);
        card.trigger("click");
      } else {
        card.trigger("click"); //в другом случае просто кликаем на картинку
      }
    });
});
Given("user add street address, firstName, zipCode", function () {
  cy.get(generalElements.arrowRight).click();
  cy.get(boxPage.selectCover).should("have.text", "Укажите почтовый адрес");
  cy.get(".form-card__main > :nth-child(1) > .frm").type(
    faker.location.streetAddress()
  );
  cy.get(".MuiGrid-grid-xs-8 > .frm-wrapper > .frm").type(
    faker.person.firstName()
  );
  cy.get(".MuiGrid-grid-xs-4 > .frm-wrapper > .frm").type(
    faker.location.zipCode()
  );
});
Given("user add wishes", function () {
  cy.get(generalElements.arrowRight).click();
  cy.get(inviteeBoxPage.wishesInput).type(wishes);
});
Given("participant card created", function () {
  cy.get(generalElements.arrowRight).click();
  cy.get(inviteeDashboardPage.noticeForInvitee)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    });
});
Given("sign out", function () {
  cy.clearCookies();
});
Given("user log in", function () {
  cy.visit("/login");
});
Given("user logs in with data", function (dataTable) {
  cy.login(dataTable.hashes()[0].login, dataTable.hashes()[0].password);
});
Given("user is on page created boxes", function () {
  cy.get(
    "#root > div.layout-1 > section.layout-1__header-wrapper-fixed > header > section > div > div > a:nth-child(1)"
  ).click();
});
Given("user is on page created new box", function () {
  cy.contains(`${newBoxName}`, { timeout: 1000 }).click();
});
Given("user is on page add participants", function () {
  cy.get(
    ".layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button > .toggle-menu-button--inner"
  ).click();
  cy.contains("Добавить участников").click({ force: true });
});
Given("checkbox enabled", function () {
  cy.get(invitePage.sandingInvitation).check({ force: true });
});
Given("user add user1 and user2 into input fields", function () {
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
});
Given("user is on drawing lots page", function () {
  cy.wait(5000);
  cy.get(
    ".layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button > .toggle-menu-button--inner"
  ).click();
  cy.get(
    ".layout-1__header-wrapper-fixed > .layout-1__header-secondary__menu > .header-secondary-menu > .organizer-menu > .organizer-menu__wrapper > :nth-child(2)"
  ).click({ force: true });
});
Given("user drew lots", function () {
  cy.get(".btn-main").click();
  cy.get(".santa-modal_content_buttons > .btn-main").click();
  cy.get(".picture-notice__title").should("have.text", "Жеребьевка проведена");
});
Given("logged out", function () {
  cy.clearCookies();
});
Given("user is on login page", function () {
  cy.visit("/login");
});
Given("user logs in with data table", function (dataTable) {
  cy.login(dataTable.hashes()[0].login, dataTable.hashes()[0].password);
});
Given("user delete new box", function () {
  cy.request({
    method: "Delete",
    url: "https://santa-secret.ru/box/" + newBoxId,
  }).then((response) => {
    expect(response.status).to.equal(200);
  });
});
