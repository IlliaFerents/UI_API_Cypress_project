import MyBooks from "../../pages/myBooksPage";
import * as bookActions from "../../support/utils/bookInteractions";

const myBooksPage = new MyBooks();

describe("Book Reading Status Changes", () => {
  let bookTitle;

  before(() => {
    cy.getRandomBookTitle().then((randomBookTitle) => {
      bookTitle = randomBookTitle;

      cy.login();
      bookActions.removeAllBooksFromAllShelves();
      bookActions.searchAndAddToReadList(bookTitle);
    });
  });

  it("changes the reading status of a book", () => {
    cy.visit("/review/list/172896678?ref=nav_mybooks");

    myBooksPage.clickEditBookReadStatusButton();
    myBooksPage.selectBookReadStatus("read");
    myBooksPage.verifyBookReadStatusChosen("read");
  });
});
