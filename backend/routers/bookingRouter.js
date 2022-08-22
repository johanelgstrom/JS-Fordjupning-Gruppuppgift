const express = require("express");
const bookingRouter = express.Router();

const BookingModel = require("../models/BookingModel.js");
const CustomerModel = require("../models/CustomerModel.js");

bookingRouter.get("/bookings/:date/:seating", async (req,res)=>{

    
    try{
        let bookings = await BookingModel.find({date : req.params.date})
        console.log("bookings: ",bookings.length);
        let bookingSeating = bookings.filter((booking)=> booking.seating = req.params.seating)
        console.log("bookingSeating: ", bookingSeating.length);
        if(bookingSeating.length > 14){
          console.log("un-bookable");
            res.send("already booked")
        }else {
          console.log("bookable");
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
        date: req.body.date, 
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
        date: req.body.date, //Date.now() tillfällig tills react calendar skickar via bodyn
        seating: req.body.seating,
        tableamount: req.body.tableamount || 1, //default 1 bord för G
        customer: customerNew._id
      });
      await newBooking.save();
    }
    
    res.sendStatus(201);
  });

module.exports = bookingRouter;