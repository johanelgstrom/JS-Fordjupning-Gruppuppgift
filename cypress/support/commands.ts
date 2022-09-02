/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

// Förberedelser
declare namespace Cypress {
  interface Chainable {
    getBookingIdCommand(): Chainable<string>;
  }
}

// Anpassad funktion som hämtar hem boknings-ID
Cypress.Commands.add("getBookingIdCommand", () => {
  // API-anrop som innehåller samma information som tidigare i testet där denna behövs
  cy.request("POST", "http://localhost:8000/email/getBookingId", {
    name: "Test Testsson",
    email: "Test@Testsson.se",
    date: "2022-09-30",
    seating: "18.00",
  })
    .as("apiResponse") //Sätter namn på det hela så vi kan hitta alltet senare i en annan fil
    .then((res) => {
      Cypress.env("bookingString", res.body); // Sätter (res.body) resultatet (boknings-ID) i Cypress.env
    });
});
