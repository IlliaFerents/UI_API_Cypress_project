import MyBooks from "../../pages/myBooksPage";
import * as bookActions from "../../support/utils/bookInteractions";

const myBooksPage = new MyBooks();

describe("Book Reading Status Changes", () => {
  before(function () {
    cy.getRandomBookTitle().then(function (randomBook) {
      cy.login();
      bookActions.removeAllBooksFromAllShelves();
      bookActions.searchAndAddToReadList(randomBook);
    });
  });

  beforeEach(function () {
    cy.login();
    cy.visit("/");

    cy.contains("My Books").click({ force: true });
  });

  it("verifies that default reading status of a book is Want to Read", () => {
    myBooksPage.clickEditBookReadStatusButton();
    myBooksPage.verifyBookReadStatusChosen("to-read");
  });

  it("changes the reading status of a book to Read", () => {
    myBooksPage.clickEditBookReadStatusButton();
    myBooksPage.selectBookReadStatus("read");
    myBooksPage.verifyBookReadStatusChosen("read");
  });

  it("changes the reading status of a book to Currently Reading", () => {
    myBooksPage.clickEditBookReadStatusButton();
    myBooksPage.selectBookReadStatus("currently-reading");
    myBooksPage.verifyBookReadStatusChosen("currently-reading");
  });
});
