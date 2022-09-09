import cypress from "cypress";
import "../support/commands.ts";

// Funktion som skapar ett random namn på 5 bokstäver
function createCustomName(length: number) {
  let result: string = "";
  let characters: string = "abcdefghijklmnopqrstuvwxyzåäö";
  let charactersLength = characters.length;
  for (var i: number = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Raderar hela databasen innan varje test, så det inte blir något knasigt med dubbelbokningar
beforeEach(() => {
  cy.request("DELETE", "http://localhost:8000/util/clear-database").then(
    (response) => {
      expect(response.status).to.eq(200);
    }
  );
});

describe("admin tests", () => {
  it("reservation should appear", () => {
    // FÖRST skapa en bokning

    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren
    cy.get("a#bookButton").click(); // Klickar på bokningssidan i headern

    cy.get(".react-calendar__month-view__days > :nth-child(33)")
      .should("have.text", "30")
      .click(); // Hittar nummer 30 i kalendern och klickar på den
    cy.get("#personAmount").select("2"); // Hittar dropdownen och klickar i för 2 personer
    cy.get("#submitBooking").click(); // Hittar och klickar på "Sök bord"-knappen
    cy.get("#informationTextContainer > :nth-child(1)").should(
      "contain",
      "Du vill boka bord 2022-09-30"
    ); // Kollar så att datumet stämmer överens
    cy.get("#informationTextContainer > :nth-child(2)").should(
      "contain",
      "för 2 personer"
    ); // Kollar så antal personer stämmer överens
    cy.get("#seating").select("18.00"); // Väljer tid vid 18.00
    cy.get("#name").type("Test Testsson"); // Skriver in namn
    cy.get("#email").type("Test@Testsson.se"); // skriver in email
    cy.get("#phone").type("+46701234556"); // Skriver in telefonnummer
    cy.get("#submitAllInfoButton").click(); // Hittar ochlickar på boka
    cy.get("h3").should("contain.html", "Tack Test Testsson för din bokning"); // Kontrollerar att namnet stämmer överens
    cy.get("#textContainer > div > :nth-child(1)").should(
      "contain.html",
      "Du har bokat bord för 2 personer"
    ); // Kontrollerar att antal personer stämmer överens
    cy.get("#textContainer > div > :nth-child(2)").should(
      "contain.html",
      "2022-09-30 klockan 18.00."
    ); // Kontrollerar att datum och tid stämmer överens
    cy.get("#textContainer > div > :nth-child(3)").should(
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
    cy.get("#textContainer > :nth-child(3)").should(
      "contain.html",
      "Med vänlig hälsning MATAD"
    ); // Kontrollerar att hälsningsfras finns med

    // KONTROLLERAR ATT BOKNINGEN FINNS I ADMIN
    cy.visit("http://localhost:3000/admin"); // Går in på adminsidan
    cy.get(":nth-child(33)").click(); // Klickar på den aktuella dagen
    cy.getBookingIdCommand(); // Kör en funktion som hämtar och sparar boknings-ID i Cypress.env
    cy.get("@apiResponse").then((response) => {
      const bookingId: string = Cypress.env("bookingString"); // Hämtar boknings-ID från Cypress.env och sätter som en variabel
      cy.get("#infoTable > :nth-child(2)").should(
        "include.html",
        `${bookingId}`
      );
    });
    cy.get("#infoTable > :nth-child(3)").should("include.html", "2022-09-30"); // Kollar så att datum stämmer överens
    cy.get("#infoTable > :nth-child(4)").should("include.html", "18.00"); // Kollar så att sittning stämmer överens
  });
  it("should be able to change reservation seating and time", () => {
    // FÖRST skapa en bokning

    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren
    cy.get("a#bookButton").click(); // Klickar på bokningssidan i headern

    cy.get(".react-calendar__month-view__days > :nth-child(33)")
      .should("have.text", "30")
      .click(); // Hittar nummer 30 i kalendern och klickar på den
    cy.get("#personAmount").select("2"); // Hittar dropdownen och klickar i för 2 personer
    cy.get("#submitBooking").click(); // Hittar och klickar på "Sök bord"-knappen
    cy.get("#informationTextContainer > :nth-child(1)").should(
      "contain",
      "Du vill boka bord 2022-09-30"
    ); // Kollar så att datumet stämmer överens
    cy.get("#informationTextContainer > :nth-child(2)").should(
      "contain",
      "för 2 personer"
    ); // Kollar så antal personer stämmer överens
    cy.get("#seating").select("18.00"); // Väljer tid vid 18.00
    cy.get("#name").type("Test Testsson"); // Skriver in namn
    cy.get("#email").type("Test@Testsson.se"); // skriver in email
    cy.get("#phone").type("+46701234556"); // Skriver in telefonnummer
    cy.get("#submitAllInfoButton").click(); // Hittar ochlickar på boka
    cy.get("h3").should("contain.html", "Tack Test Testsson för din bokning"); // Kontrollerar att namnet stämmer överens
    cy.get("#textContainer > div > :nth-child(1)").should(
      "contain.html",
      "Du har bokat bord för 2 personer"
    ); // Kontrollerar att antal personer stämmer överens
    cy.get("#textContainer > div > :nth-child(2)").should(
      "contain.html",
      "2022-09-30 klockan 18.00."
    ); // Kontrollerar att datum och tid stämmer överens
    cy.get("#textContainer > div > :nth-child(3)").should(
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
    cy.get("#textContainer > :nth-child(3)").should(
      "contain.html",
      "Med vänlig hälsning MATAD"
    ); // Kontrollerar att hälsningsfras finns med

    // ÄNDRINGSDELEN
    cy.visit("http://localhost:3000/admin"); // Går in på adminsidan
    cy.get(":nth-child(33)").click(); // Klickar på den aktuella dagen
    cy.getBookingIdCommand(); // Kör en funktion som hämtar och sparar boknings-ID i Cypress.env
    cy.get("@apiResponse").then((response) => {
      const bookingId: string = Cypress.env("bookingString"); // Hämtar boknings-ID från Cypress.env och sätter som en variabel
      cy.get("#infoTable > :nth-child(2)").should(
        "include.html",
        `${bookingId}`
      );
    });
    cy.get("#infoTable > :nth-child(3)").should("include.html", "2022-09-30"); // Kollar så att datum stämmer överens
    cy.get("#infoTable > :nth-child(4)").should("include.html", "18.00"); // Kollar så att sittning stämmer överens
    cy.get("#getCustomerButton").click(); // Klickar på "Hämta kund"
    cy.get("#getTableButton").click(); // Klickar på "Hämta bord"

    cy.get('[name="seating"]').select("21.00"); // Ändrar tid till 21.00
    cy.get("#personAmount").select("4"); // Ändrar antalet personer till 4
    cy.get("#adminEditTableSubmit").click(); // Klickar på "Ändra"knappen
    cy.get(".react-calendar__month-view__days > :nth-child(33)").click(); // Klickar på den aktuella dagen igen

    cy.get("#infoTable > :nth-child(3)").should("include.html", "2022-09-30"); // Kollar så att det nya datumet stämmer överens
    cy.get("#infoTable > :nth-child(4)").should("include.html", "21.00"); // Kollar så att det nya sittningen stämmer överens
    cy.get("#infoTable > :nth-child(5)").should("include.html", "4"); // Kollar så att det nya sittningen stämmer överens
    cy.get("#getCustomerButton").click(); // Klickar på "Hämta kund"
    cy.get("#getTableButton").click(); // Klickar på "Hämta bord"
    cy.get('[name="seating"]').select("18.00"); // Ändrar tid tillbaka till originaltiden
    cy.get("#adminEditTableSubmit").click(); // Klickar på "Ändra"knappen
  });
  it("should be able to change customer info", () => {
    // FÖRST skapa en bokning

    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren
    cy.get("a#bookButton").click(); // Klickar på bokningssidan i headern

    cy.get(".react-calendar__month-view__days > :nth-child(33)")
      .should("have.text", "30")
      .click(); // Hittar nummer 30 i kalendern och klickar på den
    cy.get("#personAmount").select("2"); // Hittar dropdownen och klickar i för 2 personer
    cy.get("#submitBooking").click(); // Hittar och klickar på "Sök bord"-knappen
    cy.get("#informationTextContainer > :nth-child(1)").should(
      "contain",
      "Du vill boka bord 2022-09-30"
    ); // Kollar så att datumet stämmer överens
    cy.get("#informationTextContainer > :nth-child(2)").should(
      "contain",
      "för 2 personer"
    ); // Kollar så antal personer stämmer överens
    cy.get("#seating").select("18.00"); // Väljer tid vid 18.00
    cy.get("#name").type("Test Testsson"); // Skriver in namn
    cy.get("#email").type("Test@Testsson.se"); // skriver in email
    cy.get("#phone").type("+46701234556"); // Skriver in telefonnummer
    cy.get("#submitAllInfoButton").click(); // Hittar ochlickar på boka
    cy.get("h3").should("contain.html", "Tack Test Testsson för din bokning"); // Kontrollerar att namnet stämmer överens
    cy.get("#textContainer > div > :nth-child(1)").should(
      "contain.html",
      "Du har bokat bord för 2 personer"
    ); // Kontrollerar att antal personer stämmer överens
    cy.get("#textContainer > div > :nth-child(2)").should(
      "contain.html",
      "2022-09-30 klockan 18.00."
    ); // Kontrollerar att datum och tid stämmer överens
    cy.get("#textContainer > div > :nth-child(3)").should(
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
    cy.get("#textContainer > :nth-child(3)").should(
      "contain.html",
      "Med vänlig hälsning MATAD"
    ); // Kontrollerar att hälsningsfras finns med

    // ÄNDRINGSDELEN
    cy.visit("http://localhost:3000/admin"); // Går in på adminsidan
    cy.get(":nth-child(33)").click(); // Klickar på den aktuella dagen
    cy.getBookingIdCommand(); // Kör en funktion som hämtar och sparar boknings-ID i Cypress.env
    cy.get("@apiResponse").then((response) => {
      const bookingId: string = Cypress.env("bookingString"); // Hämtar boknings-ID från Cypress.env och sätter som en variabel
      cy.get("#infoTable > :nth-child(2)").should(
        "include.html",
        `${bookingId}`
      );
    });
    cy.get("#infoTable > :nth-child(3)").should("include.html", "2022-09-30"); // Kollar så att datum stämmer överens
    cy.get("#infoTable > :nth-child(4)").should("include.html", "18.00"); // Kollar så att sittning stämmer överens
    cy.get("#getCustomerButton").click(); // Klickar på "Hämta kund"
    cy.get("#changeCustomerButton").click(); // Klickar på "Ändra kundinfo"
    cy.get('[type="text"]').clear().type("Restsson Rest"); // Hittar input för namn och skriver in nytt namn
    cy.get('[type="email"]').clear().type("Restsson@Rest.se"); // Hittar input för email och skriver in nytt email
    cy.get('[type="tel"]').clear().type("+46765543210"); // Hittar input för telefon och skriver in nytt nummer
    cy.get("#customerInputs > button").click(); // Klickar på "Ändra uppgifter för kund"knappen
    cy.get(":nth-child(33)").click(); // Klickar på den aktuella dagen igen
    cy.get("#getCustomerButton").click(); // Klickar på "Hämta kund" igen
    cy.get("#customerInfoAdminInfo > :nth-child(1) > :nth-child(1)").should(
      "include.html",
      "Restsson Rest"
    ); // Kontrollerar så namnet stämmer
    cy.get("#customerInfoAdminInfo > :nth-child(1) > :nth-child(2)").should(
      "include.html",
      "Restsson@Rest.se"
    ); // Kontrollerar så emailet stämmer
    cy.get("#customerInfoAdminInfo > :nth-child(1) > :nth-child(3)").should(
      "include.html",
      "+46765543210"
    ); // Kontrollerar så numret stämmer
    cy.get("#changeCustomerButton").click(); // Klickar på "Ändra kundinfo" igen
    cy.get('[type="text"]').clear().type("Test Testsson"); // Ändrar tillbaka till standardnamnet
    cy.get('[type="email"]').clear().type("Test@Testsson.se"); // Ändrar tillbaka till standardemailet
    cy.get('[type="tel"]').clear().type("+46701234556"); // Ändrar tillbaka till standardnumret
    cy.get("#customerInputs > button").click(); // Klickar på "Ändra uppgifter för kund"knappen
    cy.get("#getCustomerButton").click().as("getCustomer"); // Klickar på "Hämta kund" igen
  });

  it("shouldnt be able to change if tables are full", () => {
    // Skapar 14 bokningar vid första sittningen
    for (let i = 0; i < 14; i++) {
      let name = createCustomName(5);
      cy.request("POST", "http://localhost:8000/booking/new-booking", {
        date: "2022-09-30",
        seating: "18.00",
        personAmount: "1",
        tableAmount: "1",
        name: name,
        email: `${name}@test.se`,
        phone: "+4601234556",
      });
    }
    // FÖRST skapa en bokning

    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren
    cy.get("a#bookButton").click(); // Klickar på bokningssidan i headern

    cy.get(".react-calendar__month-view__days > :nth-child(33)")
      .should("have.text", "30")
      .click(); // Hittar nummer 30 i kalendern och klickar på den
    cy.get("#personAmount").select("2"); // Hittar dropdownen och klickar i för 2 personer
    cy.get("#submitBooking").click(); // Hittar och klickar på "Sök bord"-knappen
    cy.get("#informationTextContainer > :nth-child(1)").should(
      "contain",
      "Du vill boka bord 2022-09-30"
    ); // Kollar så att datumet stämmer överens
    cy.get("#informationTextContainer > :nth-child(2)").should(
      "contain",
      "för 2 personer"
    ); // Kollar så antal personer stämmer överens
    cy.get("#seating").select("18.00"); // Väljer tid vid 18.00
    cy.get("#name").type("Test Testsson"); // Skriver in namn
    cy.get("#email").type("Test@Testsson.se"); // skriver in email
    cy.get("#phone").type("+46701234556"); // Skriver in telefonnummer
    cy.get("#submitAllInfoButton").click(); // Hittar ochlickar på boka
    cy.get("h3").should("contain.html", "Tack Test Testsson för din bokning"); // Kontrollerar att namnet stämmer överens
    cy.get("#textContainer > div > :nth-child(1)").should(
      "contain.html",
      "Du har bokat bord för 2 personer"
    ); // Kontrollerar att antal personer stämmer överens
    cy.get("#textContainer > div > :nth-child(2)").should(
      "contain.html",
      "2022-09-30 klockan 18.00."
    ); // Kontrollerar att datum och tid stämmer överens
    cy.get("#textContainer > div > :nth-child(3)").should(
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
    cy.get("#textContainer > :nth-child(3)").should(
      "contain.html",
      "Med vänlig hälsning MATAD"
    ); // Kontrollerar att hälsningsfras finns med

    // ÄNDRINGSDELEN
    cy.visit("http://localhost:3000/admin"); // Går in på adminsidan
    cy.get(":nth-child(33)").click(); // Klickar på den aktuella dagen
    cy.get("#infoTable > :nth-child(3)").should("include.html", "2022-09-30"); // Kollar så att datum stämmer överens
    cy.get("#infoTable > :nth-child(4)").should("include.html", "18.00"); // Kollar så att sittning stämmer överens
    cy.get("#getCustomerButton").click(); // Klickar på "Hämta kund"
    cy.get("#getTableButton").click(); // Klickar på "Hämta bord"
    cy.get("#personAmount").children().should("have.length.below", 7);
  });

  it("shouldnt be able to change a booking from 21.00 to 18.00 with two tables if there is only one table left", () => {
    // Skapar 14 bokningar vid första sittningen
    for (let i = 0; i < 14; i++) {
      let name = createCustomName(5);
      cy.request("POST", "http://localhost:8000/booking/new-booking", {
        date: "2022-09-30",
        seating: "18.00",
        personAmount: "1",
        tableAmount: "1",
        name: name,
        email: `${name}@test.se`,
        phone: "+4601234556",
      });
    }
    // FÖRST skapa en bokning

    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren
    cy.get("a#bookButton").click(); // Klickar på bokningssidan i headern

    cy.get(".react-calendar__month-view__days > :nth-child(33)")
      .should("have.text", "30")
      .click(); // Hittar nummer 30 i kalendern och klickar på den
    cy.get("#personAmount").select("2"); // Hittar dropdownen och klickar i för 2 personer
    cy.get("#submitBooking").click(); // Hittar och klickar på "Sök bord"-knappen
    cy.get("#informationTextContainer > :nth-child(1)").should(
      "contain",
      "Du vill boka bord 2022-09-30"
    ); // Kollar så att datumet stämmer överens
    cy.get("#informationTextContainer > :nth-child(2)").should(
      "contain",
      "för 2 personer"
    ); // Kollar så antal personer stämmer överens
    cy.get("#seating").select("21.00"); // Väljer tid vid 18.00
    cy.get("#name").type("Test Testsson"); // Skriver in namn
    cy.get("#email").type("Test@Testsson.se"); // skriver in email
    cy.get("#phone").type("+46701234556"); // Skriver in telefonnummer
    cy.get("#submitAllInfoButton").click(); // Hittar ochlickar på boka
    cy.get("h3").should("contain.html", "Tack Test Testsson för din bokning"); // Kontrollerar att namnet stämmer överens
    cy.get("#textContainer > div > :nth-child(1)").should(
      "contain.html",
      "Du har bokat bord för 2 personer"
    ); // Kontrollerar att antal personer stämmer överens
    cy.get("#textContainer > div > :nth-child(2)").should(
      "contain.html",
      "2022-09-30 klockan 21.00."
    ); // Kontrollerar att datum och tid stämmer överens
    cy.get("#textContainer > div > :nth-child(3)").should(
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
    cy.get("#textContainer > :nth-child(3)").should(
      "contain.html",
      "Med vänlig hälsning MATAD"
    ); // Kontrollerar att hälsningsfras finns med

    // ÄNDRINGSDELEN
    cy.visit("http://localhost:3000/admin"); // Går in på adminsidan
    cy.get(":nth-child(33)").click(); // Klickar på den aktuella dagen
    cy.get(":nth-child(15) > :nth-child(3)").should(
      "include.html",
      "2022-09-30"
    ); // Kollar så att datum stämmer överens
    cy.get(":nth-child(15) :nth-child(4)").should("include.html", "21.00"); // Kollar så att sittning stämmer överens
    cy.get(":nth-child(15) > #buttonGroup > #getCustomerButton").click(); // Klickar på "Hämta kund"
    cy.get("#getTableButton").click(); // Klickar på "Hämta bord"
    cy.get('[name="seating"]').select("18.00"); // Ändrar tid till 18.00
    cy.get("#personAmount").children().should("have.length.below", 7);
  });

  it("should be able to delete a booking", () => {
    // FÖRST skapa en bokning

    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren
    cy.get("a#bookButton").click(); // Klickar på bokningssidan i headern

    cy.get(".react-calendar__month-view__days > :nth-child(33)")
      .should("have.text", "30")
      .click(); // Hittar nummer 30 i kalendern och klickar på den
    cy.get("#personAmount").select("2"); // Hittar dropdownen och klickar i för 2 personer
    cy.get("#submitBooking").click(); // Hittar och klickar på "Sök bord"-knappen
    cy.get("#informationTextContainer > :nth-child(1)").should(
      "contain",
      "Du vill boka bord 2022-09-30"
    ); // Kollar så att datumet stämmer överens
    cy.get("#informationTextContainer > :nth-child(2)").should(
      "contain",
      "för 2 personer"
    ); // Kollar så antal personer stämmer överens
    cy.get("#seating").select("18.00"); // Väljer tid vid 18.00
    cy.get("#name").type("Test Testsson"); // Skriver in namn
    cy.get("#email").type("Test@Testsson.se"); // skriver in email
    cy.get("#phone").type("+46701234556"); // Skriver in telefonnummer
    cy.get("#submitAllInfoButton").click(); // Hittar ochlickar på boka
    cy.get("h3").should("contain.html", "Tack Test Testsson för din bokning"); // Kontrollerar att namnet stämmer överens
    cy.get("#textContainer > div > :nth-child(1)").should(
      "contain.html",
      "Du har bokat bord för 2 personer"
    ); // Kontrollerar att antal personer stämmer överens
    cy.get("#textContainer > div > :nth-child(2)").should(
      "contain.html",
      "2022-09-30 klockan 18.00."
    ); // Kontrollerar att datum och tid stämmer överens
    cy.get("#textContainer > div > :nth-child(3)").should(
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
    cy.get("#textContainer > :nth-child(3)").should(
      "contain.html",
      "Med vänlig hälsning MATAD"
    ); // Kontrollerar att hälsningsfras finns med

    // ÄNDRINGSDELEN
    cy.visit("http://localhost:3000/admin"); // Går in på adminsidan
    cy.get(":nth-child(33)").click(); // Klickar på den aktuella dagen
    cy.getBookingIdCommand(); // Kör en funktion som hämtar och sparar boknings-ID i Cypress.env
    cy.get("@apiResponse").then((response) => {
      const bookingId: string = Cypress.env("bookingString"); // Hämtar boknings-ID från Cypress.env och sätter som en variabel
      cy.get("#infoTable > :nth-child(2)").should(
        "include.html",
        `${bookingId}`
      );
    });
    cy.get("#infoTable > :nth-child(3)").should("include.html", "2022-09-30"); // Kollar så att datum stämmer överens
    cy.get("#infoTable > :nth-child(4)").should("include.html", "18.00"); // Kollar så att sittning stämmer överens
    cy.get("#deleteButton").click(); // Klickar på "Hämta kund"
  });
});
