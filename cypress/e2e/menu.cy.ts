import cypress from "cypress";

describe("menu test", () => {
  it("menu button should work", () => {
    cy.visit("/");
    cy.get("div#gdprAccept").click();

    cy.get("a#menuButton").click();

    cy.url().should("include", "#menu");
  });
  it("book button should work", () => {
    cy.visit("/");
    cy.get("div#gdprAccept").click();

    cy.get("a#bookButton").click();

    cy.url().should("include", "/book");
  });
  it("contact button should work", () => {
    cy.visit("/");
    cy.get("div#gdprAccept").click();

    cy.get("a#contactButton").click();

    cy.url().should("include", "/contact");
  });
});
