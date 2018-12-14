/**
 * Tester for enkel søkelogikk
 * @author: Magnus
 */

describe("Test enkel search", function() {
  beforeEach(() => {
    cy.visit("http://it2810-34.idi.ntnu.no/prosjekt4/");
  });

  it("Tester at søkefeltet kan skrives i", () => {
    cy.get("[data-cy=search_input]")
      .type("Jeg liker testing")
      .should("have.value", "Jeg liker testing")
      .type("{del}{selectall}{backspace}")
      .should("be.empty");
  });

  it("Utføre et søk og få resultater", () => {
    cy.get("[data-cy=search_input]").type("the");
    cy.get("[data-cy=search_button]").click();
    cy.get("[data-cy=search_results]").should("have.descendants", "div");
  });

  it("Hente mer informasjon om et resultat", () => {
    cy.get("[data-cy=result_modal]").should("not.exist");
    cy.get("[data-cy=search_input]").type("The Shawshank Redemption");
    cy.get("[data-cy=search_button]").click();
    cy.get("[data-cy=search_results]")
      .find("[data-cy=movie_item]")
      .click()
      .should("exist", "[data-cy=result_modal]");
    cy.get("[data-cy=button_close]").click();
  });
});
