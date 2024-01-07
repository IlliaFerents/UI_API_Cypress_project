const token = "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";

describe("Authentication", () => {
  it("Bearer Token", () => {
    const token = "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";

    cy.request({
      method: "GET",
      url: "https://api.github.com/user/repos",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(response.body); // list of my github repos
    });
  });

  it("API Key", () => {
    cy.request({
      method: "GET",
      url: "http://api.openweathermap.org/geo/1.0/direct",
      qs: {
        q: "Lviv",
        appid: "cbd487ed66f3183d380ac4e56cd264ca",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(response.body);
    });
  });
});
