const express = require("express");
const bookingRouter = express.Router();

const BookingModel = require("../models/BookingModel.js");
const CustomerModel = require("../models/CustomerModel.js");

let date = new Date().toDateString()

bookingRouter.get("/bookings", async (req,res)=>{
    
    try{
        let bookings = await BookingModel.find({date : req.body.date})
        let bookingSeating = bookings.filter((booking)=> booking.seating = req.body.seating)
        if(bookingSeating.length > 14){
            res.send("already booked")
        }else {
            res.send("booking is possible")
        }
    }catch(error) {
        res.send(404)
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