const express = require("express");
const bookingRouter = express.Router();

const BookingModel = require("../models/BookingModel.js");
const CustomerModel = require("../models/CustomerModel.js");

let date = new Date().toDateString()

bookingRouter.get("/bookings/:date/:seating", async (req,res)=>{

  console.log("date: ",req.params.date);
  console.log("seating: ",req.params.seating);

    
    try{
        let bookings = await BookingModel.find({date : req.params.date})
        let bookingSeating = bookings.filter((booking)=> booking.seating = req.params.seating)
        if(bookingSeating.length > 14){
            res.send("already booked")
        }else {
            res.sendStatus(202)
        }
    }catch(error) {
        res.sendStatus(404)
    }
    
})

// SKAPA NY BOKNING
bookingRouter.post("/new-booking", async (req, res) => {
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

module.exports = bookingRouter;