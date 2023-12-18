export default class RegistrationPage {
  elements = {
    nameInput: () => cy.get("#ap_customer_name"),
    emailInput: () => cy.get("#ap_email"),
    passwordInput: () => cy.get("#ap_password"),
    confirmPasswordInput: () => cy.get("#ap_password_check"),
    createAccountButton: () => cy.get("#continue"),
    otpCodeInput: () => cy.get("#cvf-input-code"),
    submitOtpButton: () =>
      cy.get("[aria-labelledby='cvf-submit-otp-button-announce']"),
  };

  fillNameInput(text) {
    this.elements.nameInput().type(text);
  }

  fillEmailInput(text) {
    this.elements.emailInput().type(text);
  }

  fillPasswordInput(text) {
    this.elements.passwordInput().type(text);
  }

  fillConfirmPasswordInput(text) {
    this.elements.confirmPasswordInput().type(text);
  }

  clickCreateAccount() {
    this.elements.createAccountButton().click();
  }

  fillOtpCodeInput(text) {
    this.elements.otpCodeInput().type(text);
  }

  clickSubmitOtpButton() {
    this.elements.submitOtpButton().click();
  }
}
