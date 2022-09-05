import cypress from "cypress";
import "../support/commands.ts";

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

    // KONTROLLERAR ATT BOKNINGEN FINNS I ADMIN
    cy.visit("http://localhost:3000/admin"); // Går in på adminsidan
    cy.get(":nth-child(33)").click(); // Klickar på den aktuella dagen
    cy.get(".TableDataMap_Info__GtWpk > :nth-child(2)").should(
      "include.html",
      "2022-09-30"
    ); // Kollar så att datum stämmer överens
    cy.get(".TableDataMap_Info__GtWpk > :nth-child(3)").should(
      "include.html",
      "18.00"
    ); // Kollar så att sittning stämmer överens

    // AVBOKAR SÅ ATT MAN SLIPPER RENSA DB MANUELLT VARJE GÅNG
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
  });
  it("should be able to change reservation date and time", () => {
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

    // ÄNDRINGSDELEN
    cy.visit("http://localhost:3000/admin"); // Går in på adminsidan
    cy.get(":nth-child(33)").click(); // Klickar på den aktuella dagen
    cy.get(".TableDataMap_Info__GtWpk > :nth-child(2)").should(
      "include.html",
      "2022-09-30"
    ); // Kollar så att datum stämmer överens
    cy.get(".TableDataMap_Info__GtWpk > :nth-child(3)").should(
      "include.html",
      "18.00"
    ); // Kollar så att sittning stämmer överens
    cy.get("#getCustomerButton").click(); // Klickar på "Hämta kund"
    cy.get("#getTableButton").click(); // Klickar på "Hämta bord"
    cy.get('[type="date"]')
      .clear()
      .invoke("removeAttr", "type")
      .type("2022-09-29"); // Ändrar datum till 29/9
    cy.get("select").select("21.00"); // Ändrar tid till 21.00
    cy.get(".AdminEditTable_styleTableImputs__HmXve > button").click(); // Klickar på "Ändra"knappen
    cy.get(".react-calendar__month-view__days > :nth-child(32)").click(); // Klickar på den aktuella dagen igen
    cy.get(".TableDataMap_Info__GtWpk > :nth-child(2)").should(
      "include.html",
      "2022-09-29"
    ); // Kollar så att det nya datumet stämmer överens
    cy.get(".TableDataMap_Info__GtWpk > :nth-child(3)").should(
      "include.html",
      "21.00"
    ); // Kollar så att det nya sittningen stämmer överens
    cy.get("#getCustomerButton").click(); // Klickar på "Hämta kund"
    cy.get("#getTableButton").click(); // Klickar på "Hämta bord"
    cy.get('[type="date"]')
      .clear()
      .invoke("removeAttr", "type")
      .type("2022-09-30"); // Ändrar datum tillbaka till originaldatumet
    cy.get("select").select("18.00"); // Ändrar tid tillbaka till originaltiden
    cy.get(".AdminEditTable_styleTableImputs__HmXve > button").click(); // Klickar på "Ändra"knappen

    // AVBOKAR SÅ ATT MAN SLIPPER RENSA DB MANUELLT VARJE GÅNG
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

    // ÄNDRINGSDELEN
    cy.visit("http://localhost:3000/admin"); // Går in på adminsidan
    cy.get(":nth-child(33)").click(); // Klickar på den aktuella dagen
    cy.get(".TableDataMap_Info__GtWpk > :nth-child(2)").should(
      "include.html",
      "2022-09-30"
    ); // Kollar så att datum stämmer överens
    cy.get(".TableDataMap_Info__GtWpk > :nth-child(3)").should(
      "include.html",
      "18.00"
    ); // Kollar så att sittning stämmer överens
    cy.get("#getCustomerButton").click(); // Klickar på "Hämta kund"
    cy.get("#changeCustomerButton").click(); // Klickar på "Ändra kundinfo"
    cy.get('[type="text"]').clear().type("Restsson Rest"); // Hittar input för namn och skriver in nytt namn
    cy.get('[type="email"]').clear().type("Restsson@Rest.se"); // Hittar input för email och skriver in nytt email
    cy.get('[type="tel"]').clear().type("+46765543210"); // Hittar input för telefon och skriver in nytt nummer
    cy.get(".AdminEditCustomer_styleCustomerImputs__tCuFD > button").click(); // Klickar på "Ändra uppgifter för kund"knappen
    cy.get(":nth-child(33)").click(); // Klickar på den aktuella dagen igen
    cy.get("#getCustomerButton").click(); // Klickar på "Hämta kund" igen
    cy.get(
      ".EditCustomerBookingButton_Info__q9JmA > :nth-child(1) > :nth-child(1)"
    ).should("include.html", "Restsson Rest"); // Kontrollerar så namnet stämmer
    cy.get(
      ".EditCustomerBookingButton_Info__q9JmA > :nth-child(1) > :nth-child(2)"
    ).should("include.html", "Restsson@Rest.se"); // Kontrollerar så emailet stämmer
    cy.get(
      ".EditCustomerBookingButton_Info__q9JmA > :nth-child(1) > :nth-child(3)"
    ).should("include.html", "+46765543210"); // Kontrollerar så numret stämmer
    cy.get("#changeCustomerButton").click(); // Klickar på "Ändra kundinfo" igen
    cy.get('[type="text"]').clear().type("Test Testsson"); // Ändrar tillbaka till standardnamnet
    cy.get('[type="email"]').clear().type("Test@Testsson.se"); // Ändrar tillbaka till standardemailet
    cy.get('[type="tel"]').clear().type("+46701234556"); // Ändrar tillbaka till standardnumret
    cy.get(".AdminEditCustomer_styleCustomerImputs__tCuFD > button").click(); // Klickar på "Ändra uppgifter för kund"knappen
    cy.get("#getCustomerButton").click().as("getCustomer"); // Klickar på "Hämta kund" igen
    cy.wait(500);
    // AVBOKAR SÅ ATT MAN SLIPPER RENSA DB MANUELLT VARJE GÅNG
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

    // ÄNDRINGSDELEN
    cy.visit("http://localhost:3000/admin"); // Går in på adminsidan
    cy.get(":nth-child(33)").click(); // Klickar på den aktuella dagen
    cy.get(".TableDataMap_Info__GtWpk > :nth-child(2)").should(
      "include.html",
      "2022-09-30"
    ); // Kollar så att datum stämmer överens
    cy.get(".TableDataMap_Info__GtWpk > :nth-child(3)").should(
      "include.html",
      "18.00"
    ); // Kollar så att sittning stämmer överens
    cy.get("#deleteButton").click(); // Klickar på "Hämta kund"
  });
});
