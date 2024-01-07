/*
Precondition: generate authCode
Note: has to generated before every Auth2 request
https://github.com/login/oauth/authorize/{client__id}
https://github.com/login/oauth/authorize/?client_id=069098a5ae6004f8bfd2

1. Get the OAuth 2.0 token access
POST: https://github.com/login/oauth/access_token
Query params:
client_id
client_secret
code

2. Send GET by using access token:
https://api.github.com/user/repos
Auth: accessToken
*/
const clientID = "069098a5ae6004f8bfd2";
const clientSecret = "dd3ff43ecc436e35afe0db64d10a5babd52991b5";
const authCode = "ae8aa70f8ed13e52cdcb";
let accessToken;

describe("Auth2", () => {
  it("get Oath2 access token", () => {
    cy.request({
      method: "POST",
      url: "https://github.com/login/oauth/access_token",
      qs: {
        client_id: clientID,
        client_secret: clientSecret,
        code: authCode,
      },
    }).then((response) => {
      //access_token=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&scope=&token_type=bearer
      const params = response.body.split("&");
      accessToken = params[0].split("=")[1];
      cy.log(accessToken);
    });
  });

  it("OAuth2 request", () => {
    cy.request({
      method: "GET",
      url: "https://api.github.com/user/repos",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
