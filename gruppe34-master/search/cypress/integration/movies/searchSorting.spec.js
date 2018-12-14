/**
 * @author: Magnus
 */
describe("Test søk og sortering", function() {
  beforeEach(() => {
    cy.visit("http://it2810-34.idi.ntnu.no/prosjekt4/");
    cy.get("[data-cy=search_input]").type("The");
    cy.get("[data-cy=search_button]").click();
  });

  it("filter search by year ASC and find Back to the Future as first child", () => {
    cy.get("#standard-select-currency-native").select("Title_ASC");
    cy.get("[data-cy=update_filter_btn]").click();
    cy.wait(500);
    cy.get("[data-cy=search_results]")
      .find("[data-cy=movie_item]")
      .first()
      .click();
    cy.wait(500);
    cy.get("[data-cy=result_modal]")
      .find("H5")
      .should("have.text", "Back to the Future");
  });

  it("filter search by year DESC and find Witness for the Prosecution as first child", () => {
    cy.get("#standard-select-currency-native").select("Title_DESC");
    cy.get("[data-cy=update_filter_btn]").click();
    cy.wait(500);
    cy.get("[data-cy=search_results]")
      .find("[data-cy=movie_item]")
      .first()
      .click();
    cy.wait(500);
    cy.get("[data-cy=result_modal]")
      .find("H5")
      .should("have.text", "Witness for the Prosecution");
  });

  it("filter search by title DESC and find Back to the future as last child", () => {
    cy.get("#standard-select-currency-native").select("Title_DESC");
    cy.get("[data-cy=update_filter_btn]").click();
    cy.wait(500);
    cy.get("[data-cy=button_next]")
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click();
    cy.get("[data-cy=search_results]")
      .find("[data-cy=movie_item]")
      .last()
      .click();
    cy.wait(500);
    cy.get("[data-cy=result_modal]")
      .find("H5")
      .should("have.text", "Back to the Future");
  });

  it("filter search by year DESC and find The Kid as first child", () => {
    cy.get("#standard-select-currency-native").select("Year_ASC");
    cy.get("[data-cy=update_filter_btn]").click();
    cy.wait(500);
    cy.get("[data-cy=search_results]")
      .find("[data-cy=movie_item]")
      .first()
      .click();
    cy.wait(500);
    cy.get("[data-cy=result_modal]")
      .find("H5")
      .should("have.text", "The Kid");
  });

  it("filter search by year DESC and find Star Wars: The Force Awakens as first child", () => {
    cy.get("#standard-select-currency-native").select("Year_DESC");
    cy.get("[data-cy=update_filter_btn]").click();
    cy.get("[data-cy=search_results]")
      .find("[data-cy=movie_item]")
      .first()
      .click();
    cy.wait(500);
    cy.get("[data-cy=result_modal]")
      .find("H5")
      .should("have.text", "Star Wars: The Force Awakens");
  });

  it("filter search by year DESC and find the kid as last child", () => {
    cy.get("#standard-select-currency-native").select("Year_DESC");
    cy.get("[data-cy=update_filter_btn]").click();
    cy.wait(500);
    cy.get("[data-cy=button_next]")
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click();
    cy.get("[data-cy=search_results]")
      .find("[data-cy=movie_item]")
      .last()
      .click();
    cy.wait(500);
    cy.get("[data-cy=result_modal]")
      .find("H5")
      .should("have.text", "The Kid");
  });
});
