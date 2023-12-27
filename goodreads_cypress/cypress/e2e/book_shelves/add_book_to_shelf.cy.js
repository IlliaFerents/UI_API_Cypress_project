import * as bookActions from "../../support/utils/bookInteractions";

describe("Search and Add to Read List", () => {
  before(function () {
    cy.getRandomBookTitle().then(function (randomBook) {
      cy.wrap(randomBook).as("randomBook");

      cy.login();
    });
  });

  it("searches for a book and adds it to the Read List", function () {
    bookActions.searchAndAddToReadList(this.randomBook);
    cy.contains("My Books").click({ force: true });

    bookActions.getLastAddedBookTitle();

    cy.get("@LastAddedBookTitle").then((lastAddedBookTitle) => {
      cy.assertBookTitlesMatch(lastAddedBookTitle, this.randomBook);
    });
  });
});
