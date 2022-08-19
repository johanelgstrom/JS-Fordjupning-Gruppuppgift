const express = require("express");
const adminRouter = express.Router();

const BookingModel = require("../models/BookingModel.js");
const CustomerModel = require("../models/CustomerModel.js");

let date = new Date().toDateString()

// [ADMIN] HÄMTA ALLA BOKNINGAR
adminRouter.get("/all-bookings", async (req, res) => {
    const bookings = await BookingModel.find().lean();
    res.send(bookings);
  });

module.exports = adminRouter;