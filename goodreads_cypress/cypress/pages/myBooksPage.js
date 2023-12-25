export default class myBooksPagePage {
  elements = {
    editShelvesButton: () => cy.get("a[class='smallText']").contains("Edit"),
    allBooksLink: () => cy.get(".selectedShelf"),
    readBooksLink: () => cy.get("#auth-fpp-link-bottom"),
    currentlyReadingBooksLink: () => cy.get("#signInSubmit"),
    wantToReadBooksLink: () => cy.get("input[name='rememberMe']"),
    addShelfButton: () => cy.get("input[name='rememberMe']"),
    editBookReadStatusButton: () => cy.get(".shelfChooserLink.smallText"),
    bookReadStatusSelect: () => cy.get("ul.shelves"),
  };

  clickEditShelvesButton() {
    this.elements.editShelvesButton().click();
  }

  clickAllBooksLink() {
    this.elements.allBooksLink().click();
  }

  clickReadBooksLink() {
    this.elements.readBooksLink().click();
  }

  clickCurrentlyReadingBooksLink() {
    this.elements.currentlyReadingBooksLink().click();
  }

  clickWantToReadBooksLink() {
    this.elements.wantToReadBooksLink().click();
  }

  clickAddShelfButton() {
    this.elements.addShelfButton().click();
  }

  clickEditBookReadStatusButton() {
    this.elements.editBookReadStatusButton().click();
  }

  selectBookReadStatus(status) {
    this.elements.bookReadStatusSelect().within(() => {
      cy.contains("li", status).click();
    });
  }

  verifyBookReadStatusChosen(status) {
    this.elements.bookReadStatusSelect().within(() => {
      cy.contains("li", status).should("have.class", "exclusive_chosen");
    });
  }
}
