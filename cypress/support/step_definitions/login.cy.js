import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const users = require("../../fixtures/users.json");


Given("user is on secret santa login page", function () {
    cy.visit("/login");
  });
//   Given("user logs in", function () {
//     cy.login(users.userAutor.email, users.userAutor.password);
//   });'этот шаг преобразовался в нижний после добавления .feature логин пароль
  When("user logs in as {string} and {string}", function (login, password) { //сюда приходит из examples
    cy.login(login, password);
  });  //след шаг преобразует в табл
  When("user logs in with table", function (dataTable) {
    // cy.log(dataTable.hashes()); показывает и логин и пароль
    //cy.log(dataTable.hashes()[0].login); //получаем только логин,  обращаемся к нулевому элементу массива
    //cy.log(dataTable.hashes()[0].password); //получаем только пароль,  обращаемся к нулевому элементу массива
    cy.login(dataTable.hashes()[0].login, dataTable.hashes()[0].password); // тут используем верхние записи и логинимся с ними
});
  Then("user is on dashboard page", function () {
    cy.contains("Создать коробку").click();;
  });