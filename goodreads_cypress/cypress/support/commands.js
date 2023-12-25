// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// In your Cypress/support/commands.js file
import LoginPage from "../pages/loginPage";

Cypress.Commands.add("getRandomBookTitle", () => {
  return cy
    .request(
      "https://openlibrary.org/search.json?q=first_publish_year%3A[1953+TO+2023]&limit=1000&fields=title&language=eng",
    )
    .then((response) => {
      const titles = response.body.docs;
      const randomIndex = Math.floor(Math.random() * titles.length);
      return titles[randomIndex].title;
    });
});

const loginPage = new LoginPage();

Cypress.Commands.add("login", () => {
  let userEmail = "qcferents@gmail.com";
  let userPassword = "12qw34er5t";

  cy.visit("/");
  cy.contains("Sign In").click();
  cy.contains("Sign in with email").click();

  loginPage.fillEmailInput(userEmail);
  loginPage.fillPasswordInput(userPassword);
  loginPage.clickSignInButton();
});
