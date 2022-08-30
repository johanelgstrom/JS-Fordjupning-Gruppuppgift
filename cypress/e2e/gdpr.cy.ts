import cypress from "cypress";

describe("gdpr test", () => {
  it("gdpr accept button should work", () => {
    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren via knappen
    cy.url()
      .should("contain", "http://localhost:3000")
      .should(() => {
        expect(localStorage.getItem("GdprStatus")).to.eq("accepted");
      }); // Kollar så att knappen stänger ner modalen och kommer in på huvudsidan. Kollar sedan i localstorage om "GdprStatus" är inställd som "accepted"
  });
  it("gdpr read more button should work", () => {
    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprReadMore > a").invoke("removeAttr", "target").click(); // Klickar på "Läs mer"-knappen
    cy.url().should("contain", "https://gdpr.eu/"); // Kollar om man landar på gdpr's hemsida
    cy.go("back"); // Går tillbaka till huvudsidan samt modalen
  });
});
