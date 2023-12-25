export default class LoginPage {
  elements = {
    emailInput: () => cy.get("#ap_email"),
    passwordInput: () => cy.get("#ap_password"),
    forgotPasswordLink: () => cy.get("#auth-fpp-link-bottom"),
    signInButton: () => cy.get("#signInSubmit"),
    rememberMeCheckbox: () => cy.get("input[name='rememberMe']"),
  };

  fillEmailInput(text) {
    this.elements.emailInput().type(text);
  }

  fillPasswordInput(text) {
    this.elements.passwordInput().type(text);
  }

  clickForgotPasswordLink() {
    this.elements.forgotPasswordLink().click();
  }

  clickSignInButton() {
    this.elements.signInButton().click();
  }

  ActivateRememberMeCheckbox() {
    this.elements.signInButton().click();
  }
}
