import RegistrationPage from "../../pages/registrationPage";
import * as emailUtils from "../../support/utils/emailUtils";
const { faker } = require("@faker-js/faker");

const registrationPage = new RegistrationPage();

describe("Registration", () => {
  const fakeName = faker.person.fullName();
  const password = faker.internet.password();

  before(() => {
    emailUtils.createFakeEmail().then((email) => {
      cy.wrap(email).as("email");
    });
  });

  it("reqisters a new user using temporary email service", function () {
    cy.visit("/");
    cy.contains("Sign up with email").click();

    registrationPage.fillNameInput(fakeName);
    registrationPage.fillEmailInput(this.email);
    registrationPage.fillPasswordInput(password);
    registrationPage.fillConfirmPasswordInput(password);
    registrationPage.clickCreateAccountButton();

    emailUtils.retrieveVerificationCode().then((otpCode) => {
      registrationPage.fillOtpCodeInput(otpCode);
      registrationPage.clickSubmitOtpButton();
    });

    cy.get(".headerTitle").should("contain.text", "Getting Started");
  });
});
