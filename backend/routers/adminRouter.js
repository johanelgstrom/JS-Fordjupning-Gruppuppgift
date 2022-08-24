const express = require("express");
const adminRouter = express.Router();

const BookingModel = require("../models/BookingModel.js");
const CustomerModel = require("../models/CustomerModel.js");

let date = new Date().toDateString();

// [ADMIN] HÄMTA ALLA BOKNINGAR
adminRouter.get("/all-bookings", async (req, res) => {
  const bookings = await BookingModel.find().lean();
  res.send(bookings);
});

// adminRouter.post("/admin", async (req, res) => {
//   const bookings = {
//     _id: req.body._id,
//     date: req.body.date,
//     seating: req.body.seating,
//     tableamount: req.body.tableamount,
//     customer: req.body.customer,
//   };
//   res.send(bookings);
// });

module.exports = adminRouter;
