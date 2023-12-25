export const searchAndAddToReadList = (bookTitle) => {
  cy.visit("/");
  cy.get(".searchBox__input.searchBox__input--navbar").type(bookTitle);

  cy.get(".searchBox__icon.searchBox__icon--navbar").click();

  cy.get("div[id*='1_book']").within(() => {
    cy.get("button[class='wtrToRead']").click();
  });

  cy.get("button[title='Remove this book from your shelves']").should("exist");
};

export const removeAllBooksFromAllShelves = () => {
  cy.visit("/review/list/172896678?ref=nav_mybooks");

  cy.get("#batchEditLink").click();
  cy.get("a[onclick^='selectAllReviews()']").click();
  cy.get("#remove_books_link").click();
  cy.on("window:confirm", () => true);
};
