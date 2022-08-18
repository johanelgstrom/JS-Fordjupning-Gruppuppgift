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

let date = new Date().toDateString()

// [ADMIN] HÄMTA ALLA BOKNINGAR
app.get("/all-bookings", async (req, res) => {
  const bookings = await BookingModel.find().lean();
  res.send(bookings);
});

// SKAPA NY BOKNING
app.post("/new-booking", async (req, res) => {
  const customer = await CustomerModel.findOne({email : req.body.email})
  
  if(customer){
    const newBooking = new BookingModel({
      date: req.body.date || date, //Date.now() tillfällig tills react calendar skickar via bodyn
      seating: req.body.seating,
      tableamount: req.body.tableamount || 1, //default 1 bord för G
      customer: customer._id
    });
    await newBooking.save();
  }else{
    const newCustomer = await CustomerModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    })

    let customerNew = await newCustomer.save();
    
    const newBooking = new BookingModel({
      date: req.body.date || date, //Date.now() tillfällig tills react calendar skickar via bodyn
      seating: req.body.seating,
      tableamount: req.body.tableamount || 1, //default 1 bord för G
      customer: customerNew._id
    });
    await newBooking.save();
  }
  
  res.sendStatus(201);
});

//ROUTERS
app.use("/booking", bookingRouter)

app.listen(8000, () => {
  console.log("Server is running at http://localhost:8000 " + Date.now());
});
