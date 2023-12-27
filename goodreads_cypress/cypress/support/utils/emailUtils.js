const { faker } = require("@faker-js/faker");

const randomUsername = faker.internet.userName();

export function createFakeEmail() {
  return getDomains().then((domain) => {
    return cy
      .request({
        method: "POST",
        url: "https://api.mail.gw/accounts",
        body: {
          address: `${randomUsername}@${domain}`,
          password: "password",
        },
      })
      .then((response) => {
        expect(response.status).to.be.within(200, 299);

        const createdEmail = response.body.address;

        getAuthToken(response.body.address);

        return cy.wrap(createdEmail);
      });
  });
}

function getDomains() {
  return cy
    .request({
      method: "GET",
      url: "https://api.mail.gw/domains",
    })
    .then((domainsResponse) => {
      expect(domainsResponse.status).to.be.within(200, 299);

      return domainsResponse.body["hydra:member"][0].domain;
    });
}

function getAuthToken(emailAddress) {
  return cy
    .request({
      method: "POST",
      url: "https://api.mail.gw/token",
      body: {
        address: emailAddress,
        password: "password",
      },
    })
    .then((tokenResponse) => {
      expect(tokenResponse.status).to.be.within(200, 299);

      Cypress.env("token", tokenResponse.body.token);
    });
}

export function retrieveVerificationCode() {
  if (!Cypress.env("token")) {
    cy.log("No token available. Make sure to create a fake email first.");
    return;
  }
  cy.wait(5000);

  return getLatestMessageId()
    .then((latestMessageId) => {
      return getMessageContentById(latestMessageId);
    })
    .then((messageBody) => {
      cy.log("Message Content:", messageBody);

      const otpCode = extractOtpCodeFromHtml(messageBody.html[0]);
      return cy.wrap(otpCode);
    });
}

// Retrieves the latest message ID
function getLatestMessageId() {
  return cy
    .request({
      method: "GET",
      url: "https://api.mail.gw/messages",
      headers: {
        Authorization: "Bearer " + Cypress.env("token"),
      },
    })
    .then((messages) => {
      const latestMessageId = messages.body["hydra:member"][0]["@id"];
      return cy.wrap(latestMessageId);
    });
}

// Retrieves the message content by ID
function getMessageContentById(messageId) {
  return cy
    .request({
      method: "GET",
      url: `https://api.mail.gw${messageId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("token"),
      },
    })
    .then((messageBody) => {
      return cy.wrap(messageBody.body);
    });
}

// Extracts the OTP code from the message HTML content
function extractOtpCodeFromHtml(htmlContent) {
  const match = htmlContent.match(/<p class="otp">(\d+)<\/p>/);
  return match ? match[1] : null;
}
