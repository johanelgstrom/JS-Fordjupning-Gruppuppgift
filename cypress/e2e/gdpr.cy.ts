import cypress from "cypress";

describe("gdpr test", () => {
  it("gdpr accept button should work", () => {
    cy.visit("/");
    cy.get("div#gdprAccept").click();
    cy.url().should("contain", "http://localhost:3000");
  });
  it("gdpr read more button should work", () => {
    cy.visit("/");
    cy.get("div#gdprReadMore > a").invoke("removeAttr", "target").click();
    cy.url().should("contain", "https://gdpr.eu/");
    cy.go("back");
  });
});
