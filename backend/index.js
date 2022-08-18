require("dotenv").config();
require("./mongoose.js");
const express = require("express");

const BookingModel = require("./models/BookingModel.js");
const CustomerModel = require("./models/CustomerModel.js");

const app = express();
//comment
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(8000, () => {
  console.log("Server is running");
});
