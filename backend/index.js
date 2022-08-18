require("dotenv").config();
require("./mongoose.js");

//REQUIREMENTS
const express = require("express");
const cors = require("cors");

const BookingModel = require("./models/BookingModel.js");
const CustomerModel = require("./models/CustomerModel.js");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(8000, () => {
  console.log("Server is running");
});
