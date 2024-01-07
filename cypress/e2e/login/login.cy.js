import LoginPage from "../../pages/loginPage";

const loginPage = new LoginPage();

describe("Login", () => {
  beforeEach(() => {
    cy.fixture("user_login").then(function (userData) {
      this.userData = userData;
    });
    cy.visit("/");
    cy.contains("Sign In").click();
    cy.contains("Sign in with email").click();
  });

  it("logs into app with existing user", function () {
    loginPage.fillEmailInput(this.userData.email);
    loginPage.fillPasswordInput(this.userData.password);
    loginPage.clickSignInButton();

    cy.contains("Profile").click({ force: true });
    cy.get("#profileNameTopHeading").should("contain", this.userData.userName);
  });

  it("displays error message when submitting empty forms", () => {
    loginPage.clickSignInButton();

    cy.get("#auth-email-missing-alert")
      .should("be.visible")
      .and("contain", "Enter your email");

    cy.get("#auth-password-missing-alert")
      .should("be.visible")
      .and("contain", "Enter your password");
  });
});
