import cypress from "cypress";

describe("contact test", () => {
  it("contact form should go through", () => {
    cy.visit("/");
    cy.get("div#gdprAccept").click();
    cy.get("a#contactButton").click();
    cy.url().should("contain", "/contact");
    cy.get("input#name").type("Test Testsson");
    cy.get("input#email").type("Test@Testsson.se");
    cy.get("textarea#text").type("This is a test");
    cy.get("button#submitContact").click();

    cy.get("p#confirmTitle").should("contain", "Tack Test Testsson");
    cy.get("p#confirmText").should(
      "contain",
      "Vi kontaktar dig så snart som möjligt på Test@Testsson.se"
    );
  });
});
