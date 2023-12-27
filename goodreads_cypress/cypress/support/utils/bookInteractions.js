export const searchAndAddToReadList = (bookTitle) => {
  cy.visit("/");
  cy.get(".searchBox__input.searchBox__input--navbar").type(bookTitle);

  cy.get(".searchBox__icon.searchBox__icon--navbar").click();

  cy.get("div[id*='1_book']").within(() => {
    cy.get("button[class='wtrToRead']").click();
  });

  cy.get(".wtrUnshelve").should("be.visible");
};

export const removeAllBooksFromAllShelves = () => {
  cy.visit("/");
  cy.contains("My Books").click({ force: true });

  cy.get(".selectedShelf").contains("All").click();
  cy.get("#batchEditLink").click();
  cy.get("a[onclick^='selectAllReviews()']").click();
  cy.get("#remove_books_link").click();
};

export const getLastAddedBookTitle = () => {
  return cy
    .get(".bookalike.review:nth-child(1)")
    .find(".field.title")
    .invoke("text")
    .as("LastAddedBookTitle");
};
