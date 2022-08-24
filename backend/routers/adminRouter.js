const express = require("express");
const adminRouter = express.Router();

const BookingModel = require("../models/BookingModel.js");
const CustomerModel = require("../models/CustomerModel.js");

// [ADMIN] HÄMTA ALLA BOKNINGAR
adminRouter.get("/all-bookings", async (req, res) => {
  const bookings = await BookingModel.find().lean();
  res.send(bookings);
});

adminRouter.get("/all-bookings/:date", async (req, res) => {
  console.log("Test");
  const bookingsByDate = await BookingModel.find({ date: req.params.date });
  res.send(bookingsByDate);
});

adminRouter.get("/customers/:id", async (req, res) => {
  console.log("wwwww", req.params.id);
  const customer = await CustomerModel.find({ _id: req.params.id });
  console.log(" BackEnd custumer", customer);
  res.send(customer);
});

adminRouter.post("/customers/delete/:idDelete", async (req, res) => {
  await BookingModel.deleteOne({ _id: req.params.idDelete });
  console.log("Deleted");
  res.send("deleted");
});

module.exports = adminRouter;
