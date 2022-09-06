require("dotenv").config();
require("./mongoose.js");

//REQUIREMENTS
const express = require("express");
const cors = require("cors");

//ROUTER REQUIREMENTS
const bookingRouter = require("./routers/bookingRouter.js");
const adminRouter = require("./routers/adminRouter.js");
const emailRouter = require("./routers/emailRouter.js");
const utilRouter = require("./routers/utilRouter.js");

//SETUP
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

//ROUTERS
app.use("/booking", bookingRouter);
app.use("/admin", adminRouter);
app.use("/email", emailRouter);
app.use("/util", utilRouter);

app.listen(8000, () => {
  console.log("Server is running at http://localhost:8000");
});
