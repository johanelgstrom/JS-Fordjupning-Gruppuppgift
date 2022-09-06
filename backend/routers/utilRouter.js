const express = require("express");
const utilRouter = express.Router();
const BookingModel = require("../models/BookingModel.js");
const CustomerModel = require("../models/CustomerModel.js");

// *FÖR TESTNING* rensar databasen på både bokningar samt kunder
utilRouter.delete("/clear-database", async (req, res) => {
  await BookingModel.deleteMany({});
  await CustomerModel.deleteMany({});

  res.sendStatus(200);
});

module.exports = utilRouter;
