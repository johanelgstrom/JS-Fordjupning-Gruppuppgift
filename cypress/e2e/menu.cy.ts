import cypress from "cypress";

describe("menu test", () => {
  it("menu button should work", () => {
    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren

    cy.get("a#menuButton").click(); // Klickar på meny-knappen i headern

    cy.url().should("include", "#menu"); // Kollar i URLen om man är på rätt sida
    cy.get("#menuTitle").should("contain.html", "MENY"); // Kollar så att titeln i menyn innehåller order "MENY"
  });
  it("book button should work", () => {
    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren

    cy.get("a#bookButton").click(); // Klickar på bokningsknappen i headern

    cy.url().should("include", "/book"); // Kollar i URLen om man är på bokningssidan
    cy.get("#submitBooking").should("contain.html", "Sök lediga bord"); // Kollar så att texten i sökningsknappen är "Sök lediga bord"
  });
  it("contact button should work", () => {
    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren

    cy.get("a#contactButton").click(); // Klickar på kontaktknappen i headern

    cy.url().should("include", "/contact"); // Kollar i URLen om man är på kontaktsidan
    cy.get("h3").should("contain.html", "Fyll i vårt kontaktformulär!"); // Kollar så att titeln i kontaktformuläret är "Fyll i vårt kontaktformulär"
  });
});
