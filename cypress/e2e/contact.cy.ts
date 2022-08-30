import cypress from "cypress";

describe("contact test", () => {
  it("contact form should go through", () => {
    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren
    cy.get("a#contactButton").click(); // Klickar på kontaktknappen i headern
    cy.url().should("contain", "/contact"); // Kollar så att URLen innehåller "contact"
    cy.get("input#name").type("Test Testsson"); // Skriver in namn på rätt ställe
    cy.get("input#email").type("Test@Testsson.se"); // Skriver in email på rätt ställe
    cy.get("textarea#text").type("This is a test"); // Skriver in en text i frågefältet
    cy.get("button#submitContact").click(); // Klickar på Skicka

    cy.get("p#confirmTitle").should("contain", "Tack Test Testsson"); // Kollar så att titeln är korrekt efter lyckat ifyllt
    cy.get("p#confirmText").should(
      "contain",
      "Vi kontaktar dig så snart som möjligt på Test@Testsson.se"
    ); // Kollar så att texten är korrekt efter lyckat ifyllt
  });
});
