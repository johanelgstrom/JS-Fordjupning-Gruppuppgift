require("dotenv").config();
require("./mongoose.js");

//REQUIREMENTS
const express = require("express");
const cors = require("cors");

const BookingModel = require("./models/BookingModel.js");
const CustomerModel = require("./models/CustomerModel.js");

//ROUTER REQUIREMENTS
const bookingRouter = require("./routers/bookingRouter.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/new-booking", async (req, res) => {
  const newBooking = new BookingModel({
    date: req.body.date || Date.now(), //Date.now() tillfällig tills react calendar skickar via bodyn
    seating: req.body.seating,
    tableamount: req.body.tableamount || 1, //default 1 bord för G
  });
  await newBooking.save();

  res.sendStatus(201);
});

//ROUTERS
app.use("/booking", bookingRouter)

app.listen(8000, () => {
  console.log("Server is running at http://localhost:8000 " + Date.now());
});
