import cypress from "cypress";

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

describe("booking test", () => {
  it("booking on an non-full day should go through", () => {
    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren
    cy.get("a#bookButton").click(); // Klickar på bokningssidan i headern

    cy.get(".react-calendar__month-view__days > :nth-child(33)")
      .should("have.text", "30")
      .click(); // Hittar nummer 31 i kalendern och klickar på den
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
  });
  it("check that validating works", () => {
    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren
    cy.get("a#bookButton").click(); // Klickar på bokningssidan i headern

    cy.get("#submitBooking").click(); // Hittar och klickar på "Sök bord"-knappen
    cy.get("#validateContainer > p").should(
      "contain.html",
      "Du måste välja antal personer!"
    ); // Kollar så att felmeddelande dyker upp
    cy.get("#personAmount").select("2"); // Hittar dropdownen och klickar i för 2 personer
    cy.get("#submitBooking").click(); // Hittar och klickar på "Sök bord"-knappen igen, fast nu med antal personer valda
    cy.get("#submitAllInfoButton").click(); // Hittar och klickar på boka
    cy.get("#validateTextButtonContainer > p").should(
      "contain.html",
      "Fyll i formuläret korrekt"
    ); // Kontrollerar att "snackbaren" dyker upp och innehåller en varningstext
    cy.get("button > div").click(); // Hittar och klickar på knappen som stänger snackbaren
    cy.get("#name").type("e"); // Skriver in namn felaktigt
    cy.get("#nameErrorMessage").should(
      "contain.html",
      "Ditt namn måste vara minst två tecken långt."
    ); //Kontrollerar att felmeddelande fungerar
    cy.get("#email").type("Test#Testsson.se"); // skriver in email felaktigt
    cy.get("#emailErrorMessage").should(
      "contain.html",
      "Skriv in en valid emailadress"
    ); //Kontrollerar att felmeddelande fungerar
    cy.get("#phone").type("911"); // Skriver in telefonnummer felaktigt
    cy.get("#phoneErrorMessage").should(
      "contain.html",
      "Skriv in rätt telefonnummerformat: +467********"
    ); //Kontrollerar att felmeddelande fungerar
    cy.get("#seating").select("18.00"); // Väljer tid vid 18.00
    cy.get("#name").clear().type("Test Testsson"); // Tömmer namn och skriver in korrekt
    cy.get("#email").clear().type("Test@Testsson.se"); // Tömmer email och skriver in korrekt
    cy.get("#phone").clear().type("+46701234556"); // Tömmer telefon och skriver in korrekt
    cy.get("#submitAllInfoButton").click(); // Hittar och klickar på boka, nu med korrekt information
    cy.get("h3").should("contain.html", "Tack Test Testsson för din bokning"); // Kontrollerar att namnet stämmer överens
  });
  it("shouldnt be able to book if a sitting is full", () => {
    // Skapar 15 bokningar vid första sittningen
    for (let i = 0; i < 15; i++) {
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
    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren
    cy.get("a#bookButton").click(); // Klickar på bokningssidan i headern

    cy.get(".react-calendar__month-view__days > :nth-child(33)")
      .should("have.text", "30")
      .click(); // Hittar nummer 31 i kalendern och klickar på den
    cy.get("#personAmount").select("2"); // Hittar dropdownen och klickar i för 2 personer
    cy.get("#submitBooking").click(); // Hittar och klickar på "Sök bord"-knappen
    cy.get("#seating").select(1).should("not.include.html", "18.00");
  }); // Väljer det första alternativet (förutom "Välj tid"), och kollar så att 18.00 inte går att välja
  it("shouldnt be able to book on a full day", () => {
    // Skapar 15 bokningar vid första sittningen
    for (let i = 0; i < 15; i++) {
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
    // Skapar 15 bokningar vid andra sittningen
    for (let i = 0; i < 15; i++) {
      let name = createCustomName(5);
      cy.request("POST", "http://localhost:8000/booking/new-booking", {
        date: "2022-09-30",
        seating: "21.00",
        personAmount: "1",
        tableAmount: "1",
        name: name,
        email: `${name}@test.se`,
        phone: "+4601234556",
      });
    }

    cy.visit("http://localhost:3000"); // Går in på sidan
    cy.get("div#gdprAccept").click(); // Accepterar GDPR-villkoren
    cy.get("a#bookButton").click(); // Klickar på bokningssidan i headern

    cy.get(".react-calendar__month-view__days > :nth-child(33)")
      .should("have.text", "30")
      .click(); // Hittar nummer 31 i kalendern och klickar på den
    cy.get("#personAmount").select("2"); // Hittar dropdownen och klickar i för 2 personer
    cy.get("#submitBooking").click(); // Hittar och klickar på "Sök bord"-knappen
    cy.get("#validateContainer > p").should(
      "contain.html",
      "Fullbokat den dagen, välj en annan"
    ); // Kollar om felmeddelande att det är fullbokat dyker upp
  });
});
