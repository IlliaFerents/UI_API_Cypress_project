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
      "https://openlibrary.org/search.json?q=first_publish_year%3A[1993+TO+2023]&limit=1000&fields=title&language=eng",
    )
    .then((response) => {
      const titles = response.body.docs;
      const randomIndex = Math.floor(Math.random() * titles.length);
      return titles[randomIndex].title;
    });
});

Cypress.Commands.add(
  "assertBookTitlesMatch",
  (retrievedBookTitleAlias, expectedBookTitle) => {
    expect(retrievedBookTitleAlias.toLowerCase()).to.include(
      expectedBookTitle.toLowerCase(),
    );
  },
);

const loginPage = new LoginPage();

Cypress.Commands.add("login", () => {
  cy.fixture("user_login").then((userData) => {
    cy.session(
      [userData.email, userData.password],
      () => {
        cy.visit("/");
        cy.contains("Sign In").click();
        cy.contains("Sign in with email").click();

        loginPage.fillEmailInput(userData.email);
        loginPage.fillPasswordInput(userData.password);
        loginPage.clickSignInButton();
      },
      {
        cacheAcrossSpecs: true,
      },
    );
  });
});
