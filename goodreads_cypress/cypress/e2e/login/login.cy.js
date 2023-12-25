import LoginPage from "../../pages/loginPage";

const loginPage = new LoginPage();

describe("Login", () => {
  let userEmail = "qcferents@gmail.com";
  let userPassword = "12qw34er5t";

  it("logs into app with existing user", () => {
    cy.visit("/");
    cy.contains("Sign In").click();
    cy.contains("Sign in with email").click();

    loginPage.fillEmailInput(userEmail);
    loginPage.fillPasswordInput(userPassword);
    loginPage.clickSignInButton();
  });
});
