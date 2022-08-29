import cypress from "cypress";

describe("booking test", () => {
  it("booking on an non-full day should go through", () => {
    cy.visit("/");
    cy.get("div#gdprAccept").click();
    cy.get("a#bookButton").click();

    cy.get(".react-calendar__month-view__days > :nth-child(27)")
      .should("have.text", "27")
      .click();
    cy.get("#personAmount").select("2");
    // cy.get(".SearchTableForm_submitButton__aQxNo").click();
    cy.request(
      "GET",
      "http://localhost:8000/booking/bookings/:date/:personAmount",
      "2022-08-27/2"
    );
  });
});
