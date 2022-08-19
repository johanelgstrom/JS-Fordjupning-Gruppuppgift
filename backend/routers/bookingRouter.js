const express = require("express");
const bookingRouter = express.Router();

const BookingModel = require("../models/BookingModel.js");

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

module.exports = bookingRouter;