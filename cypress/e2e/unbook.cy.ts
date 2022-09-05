import cypress from "cypress";
import "../support/commands.ts";

describe("cancel reservation", () => {
  it("canceling a reservation should work", () => {
    // FÖRST skapa en bokning

    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren
    cy.get("a#bookButton").click(); // Klickar på bokningssidan i headern

    cy.get(".react-calendar__month-view__days > :nth-child(33)")
      .should("have.text", "30")
      .click(); // Hittar nummer 30 i kalendern och klickar på den
    cy.get("#personAmount").select("2"); // Hittar dropdownen och klickar i för 2 personer
    cy.get(".SearchTableForm_submitButton__aQxNo").click(); // Hittar och klickar på "Sök bord"-knappen
    cy.get(
      ".BookTableForm_informationTextContainer__zk94W > :nth-child(1)"
    ).should("contain", "Du vill boka bord 2022-09-30"); // Kollar så att datumet stämmer överens
    cy.get(
      ".BookTableForm_informationTextContainer__zk94W > :nth-child(2)"
    ).should("contain", "för 2 personer"); // Kollar så antal personer stämmer överens
    cy.get("#seating").select("18.00"); // Väljer tid vid 18.00
    cy.get("#name").type("Test Testsson"); // Skriver in namn
    cy.get("#email").type("Test@Testsson.se"); // skriver in email
    cy.get("#phone").type("+46701234556"); // Skriver in telefonnummer
    cy.get(".BookTableForm_submitButton__sa5tL").click(); // Hittar ochlickar på boka
    cy.get("h3").should("contain.html", "Tack Test Testsson för din bokning"); // Kontrollerar att namnet stämmer överens
    cy.get(".Confirmation_textContainer__dEDJJ > div > :nth-child(1)").should(
      "contain.html",
      "Du har bokat bord för 2 personer"
    ); // Kontrollerar att antal personer stämmer överens
    cy.get(".Confirmation_textContainer__dEDJJ > div > :nth-child(2)").should(
      "contain.html",
      "2022-09-30 klockan 18.00."
    ); // Kontrollerar att datum och tid stämmer överens
    cy.get(".Confirmation_textContainer__dEDJJ > div > :nth-child(3)").should(
      "contain.html",
      "En bekräftelse kommer skickas till dig till adressen Test@Testsson.se."
    ); // Kontrollerar att email stämmer överens
    cy.get("div > :nth-child(4)").should(
      "contain.html",
      "Vid avbokning klicka på avbokningslänken i bekräftelsemailet"
    ); // Kontrollerar att information stämmer överens
    cy.get("div > :nth-child(5)").should(
      "contain.html",
      "eller kontakta oss på telefonnummer 0701234567"
    ); // Kontrollerar att nummer stämmer överens
    cy.get(".Confirmation_textContainer__dEDJJ > :nth-child(3)").should(
      "contain.html",
      "Med vänlig hälsning MATAD"
    ); // Kontrollerar att hälsningsfras finns med

    // ABOKNINGSDELEN

    cy.getBookingIdCommand(); // Kör en funktion som hämtar och sparar boknings-ID i Cypress.env
    cy.get("@apiResponse").then((response) => {
      const bookingId: string = Cypress.env("bookingString"); // Hämtar boknings-ID från Cypress.env och sätter som en variabel
      cy.visit(`http://localhost:3000/cancel/${bookingId}`); // Går in på bokningssidan på bokningen vi skapade
    });

    cy.get("h3").should("contain.html", "Hej Test Testsson!"); // Kollar så att titeln har rätt namn
    cy.get(
      ".CancelBookingInformation_informationTextContainer__yoCsQ > :nth-child(3)"
    ).should("contain.html", "för 2 personer, 2022-09-30"); // Kollar så att texten har rätt antal personer

    cy.get("button").click(); // Klickar på "Avboka"knappen

    cy.get("h3").should("contain.html", "Ditt bord är nu avbokat."); // Kontrollerar att frontend visar bekräftelse att det är avbokat

    cy.get(
      ".CancelBookingConfirmation_container__lmvjT > #bookButton > p"
    ).click(); // Klickar på "Boka"knappen som ska ta sig tillbaka till vanliga bokningssidan

    cy.get("@apiResponse").then((response) => {
      cy.request(
        // Kör ett API-anrop som kollar ifall boknigns-ID är borta ur databasen
        "GET",
        `http://localhost:8000/booking/cancel/check/${Cypress.env(
          "bookingString"
        )}`
      ).then((response) => {
        expect(response.isOkStatusCode); // Om svaret blir 200, är boknings-ID borta
      });
    });

    cy.url().should("include", "/book"); // Kollar i URLen om man är på bokningssidan
  });
});
