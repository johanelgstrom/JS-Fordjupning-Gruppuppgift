import cypress from "cypress";
import "cypress-react-selector";

describe("booking test", () => {
  it("booking on an non-full day should go through", () => {
    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren
    cy.get("a#bookButton").click(); // Klickar på bokningssidan i headern

    cy.get(".react-calendar__month-view__days > :nth-child(31)")
      .should("have.text", "31")
      .click(); // Hittar nummer 31 i kalendern och klickar på den
    cy.get("#personAmount").select("2"); // Hittar dropdownen och klickar i för 2 personer
    cy.get(".SearchTableForm_submitButton__aQxNo").click(); // Hittar och klickar på "Sök bord"-knappen
    cy.get(
      ".BookTableForm_informationTextContainer__zk94W > :nth-child(1)"
    ).should("contain", "Du vill boka bord 2022-08-31"); // Kollar så att datumet stämmer överens
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
      "2022-08-31 klockan 18.00."
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
  });
  it("check that validating works", () => {
    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren
    cy.get("a#bookButton").click(); // Klickar på bokningssidan i headern

    cy.get(".SearchTableForm_submitButton__aQxNo").click(); // Hittar och klickar på "Sök bord"-knappen
    cy.get(".SearchTableForm_validate__35ERp > p").should(
      "contain.html",
      "Du måste välja antal personer!"
    ); // Kollar så att felmeddelande dyker upp
    cy.get("#personAmount").select("2"); // Hittar dropdownen och klickar i för 2 personer
    cy.get(".SearchTableForm_submitButton__aQxNo").click(); // Hittar och klickar på "Sök bord"-knappen igen, fast nu med antal personer valda
    cy.get(".BookTableForm_submitButton__sa5tL").click(); // Hittar och klickar på boka
    cy.get(".ValidateSnackBar_textButtonContainer__wIr8G > p").should(
      "contain.html",
      "Fyll i formuläret korrekt"
    ); // Kontrollerar att "snackbaren" dyker upp och innehåller en varningstext
    cy.get("button > div").click(); // Hittar och klickar på knappen som stänger snackbaren
    cy.get("#name").type("e"); // Skriver in namn felaktigt
    cy.get(":nth-child(2) > .BookTableForm_validate__mGQy1").should(
      "contain.html",
      "Ditt namn måste vara minst två tecken långt."
    ); //Kontrollerar att felmeddelande fungerar
    cy.get("#email").type("Test#Testsson.se"); // skriver in email felaktigt
    cy.get(":nth-child(3) > .BookTableForm_validate__mGQy1").should(
      "contain.html",
      "Skriv in en valid emailadress"
    ); //Kontrollerar att felmeddelande fungerar
    cy.get("#phone").type("911"); // Skriver in telefonnummer felaktigt
    cy.get(":nth-child(4) > .BookTableForm_validate__mGQy1").should(
      "contain.html",
      "Skriv in rätt telefonnummerformat: +467********"
    ); //Kontrollerar att felmeddelande fungerar
    cy.get("#seating").select("18.00"); // Väljer tid vid 18.00
    cy.get("#name").clear().type("Test Testsson"); // Tömmer namn och skriver in korrekt
    cy.get("#email").clear().type("Test@Testsson.se"); // Tömmer email och skriver in korrekt
    cy.get("#phone").clear().type("+46701234556"); // Tömmer telefon och skriver in korrekt
    cy.get(".BookTableForm_submitButton__sa5tL").click(); // Hittar och klickar på boka, nu med korrekt information
    cy.get("h3").should("contain.html", "Tack Test Testsson för din bokning"); // Kontrollerar att namnet stämmer överens
  });
});
