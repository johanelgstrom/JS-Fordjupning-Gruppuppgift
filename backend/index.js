require("dotenv").config();
require("./mongoose.js");
const express = require("express");

const BookingModel = require("./models/BookingModel.js");
const CustomerModel = require("./models/CustomerModel.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// [ADMIN] HÄMTA ALLA BOKNINGAR
app.get("/all-bookings", async (req, res) => {
  const bookings = await BookingModel.find().lean();
  res.send(bookings);
});

// SKAPA NY BOKNING
app.post("/new-booking", async (req, res) => {
  const newBooking = new BookingModel({
    date: req.body.date || Date.now(), //Date.now() tillfällig tills react calendar skickar via bodyn
    seating: req.body.seating,
    tableamount: req.body.tableamount || 1, //default 1 bord för G
  });
  await newBooking.save();

  res.sendStatus(201);
});

app.listen(8000, () => {
  console.log("Server is running at http://localhost:8000 " + Date.now());
});
