require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(8000, () => {
  console.log("Server is running");
});
