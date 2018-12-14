/**
 * Tester filterfunksjoner
 * @author: Magnus
 */

describe("Test søk og filtrering", function() {
  beforeEach(() => {
    cy.visit("http://it2810-34.idi.ntnu.no/prosjekt4/");
    cy.get("[data-cy=search_input]").type("ner");
    cy.get("[data-cy=search_button]").click();
  });

  it("Filtrere ut The General med å sette fra 1927", () => {
    cy.get("[data-cy=search_results]")
      .children()
      .should("contain", "The General");
    cy.get("#standard-number").type("1927");
    cy.get("[data-cy=update_filter_btn]").click();
    cy.get("[data-cy=search_results]")
      .children()
      .should("not.contain", "The General");
  });

  it("Filtrere ut Prisonerved å sette til 2000", () => {
    cy.get("[data-cy=search_results]")
      .children()
      .should("contain", "Prisoners");
    cy.get("#standard-number2").type("2000");
    cy.get("[data-cy=update_filter_btn]").click();
    cy.get("[data-cy=search_results]")
      .children()
      .should("not.contain", "Prisoners");
  });

  it("Kun Blade Runner når setting fra 1927 til 2000", () => {
    cy.get("[data-cy=search_results]")
      .children()
      .should("contain", "Prisoners")
      .should("contain", "The General");
    cy.get("#standard-number").type("1927");
    cy.get("#standard-number2").type("2000");
    cy.get("[data-cy=update_filter_btn]").click();
    cy.get("[data-cy=search_results]")
      .children()
      .should("not.contain", "Prisoners")
      .should("not.contain", "The General");
  });
});
