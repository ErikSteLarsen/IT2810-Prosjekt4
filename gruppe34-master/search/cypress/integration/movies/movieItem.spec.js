/**
 * Testing av funksjoner til komponenten movieItem
 * @author: Magnus
 */

describe("Test movieItem komponent", () => {
  beforeEach(function() {
    cy.visit("http://it2810-34.idi.ntnu.no/prosjekt4/");
    cy.get("[data-cy=search_input]").type(
      "Star Wars: Episode V - The Empire Strikes Back"
    );
    cy.get("[data-cy=search_button]").click();
  });
  it("Teste fillTitle funksjon. Kutte lange titler", () => {
    cy.get("[data-cy=search_results]")
      .get("[data-cy=movie_item]")
      .get("[data-cy=card")
      .find("[data-cy=title]")
      .contains("Star Wars: Episode V - The Empire Strike...");
  });

  it("Teste at setInputValue bare kan skrive tall melllom 0 og 10", () => {
    cy.get("[data-cy=search_results]")
      .get("[data-cy=movie_item]")
      .click();
    cy.wait(500);
    cy.get("[data-cy=result_modal]")
      .get("[data-cy=ntnu_rating_input]")
      .type("9");
    cy.get("[data-cy=ntnu_rating_input]")
      .invoke("val")
      .should("contain", "9");
    cy.get("[data-cy=ntnu_rating_input]")
      .type("{del}{selectall}{backspace}")
      .type("12");
    cy.get("[data-cy=ntnu_rating_input]")
      .invoke("val")
      .should("not.contain", "12");
    cy.get("[data-cy=ntnu_rating_input]")
      .type("{del}{selectall}{backspace}")
      .type("-3");
    cy.get("[data-cy=ntnu_rating_input]")
      .invoke("val")
      .should("not.contain", "-3");
  });

  it("Skal ikke gå an å skrive bokstaver i rating input felt", () => {
    cy.get("[data-cy=search_results]")
      .get("[data-cy=movie_item]")
      .click();
    cy.wait(500);
    cy.get("[data-cy=result_modal]")
      .get("[data-cy=ntnu_rating_input]")
      .type("asd");
    cy.get("[data-cy=ntnu_rating_input]")
      .invoke("val")
      .should("not.contain", "asd");
  });
});
