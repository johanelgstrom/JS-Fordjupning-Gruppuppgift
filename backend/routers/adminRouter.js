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
  const bookingsByDate = await BookingModel.find({ date: req.params.date });
  res.send(bookingsByDate);
});

adminRouter.get("/customers/:id", async (req, res) => {
  const customer = await CustomerModel.find({ _id: req.params.id });
  console.log(" BackEnd custumer", customer);
  res.send(customer);
});

adminRouter.delete("/customers/delete/:idDelete", async (req, res) => {
  await BookingModel.deleteOne({ _id: req.params.idDelete });
  console.log("Deleted");
  res.status(200).json({ message: "deleted" });
});

adminRouter.post("/customers", async (req, res) => {
  await CustomerModel.create(req.body).then(function (postCustomer) {
    res.send(postCustomer);
  });
});

adminRouter.post("/bookings", async (req, res) => {
  await BookingModel.create(req.body).then(function (postBookings) {
    res.send(postBookings);
  });
});

adminRouter.put("/customers/:idUpdate", async (req, res) => {
  await CustomerModel.findByIdAndUpdate(
    { _id: req.params.idUpdate },
    req.body
  ).then(function () {
    CustomerModel.findOne({ _id: req.params.idUpdate }).then(function (update) {
      res.send(update);
    });
  });
});

adminRouter.put("/bookings/:idUpdate", async (req, res) => {
  await BookingModel.findByIdAndUpdate(
    { _id: req.params.idUpdate },
    req.body
  ).then(function () {
    BookingModel.findOne({ _id: req.params.idUpdate }).then(function (update) {
      res.send(update);
    });
  });
});

module.exports = adminRouter;
