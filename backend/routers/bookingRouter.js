const express = require("express");
const bookingRouter = express.Router();

const BookingModel = require("../models/BookingModel.js");
const CustomerModel = require("../models/CustomerModel.js");





//SEARCH EXISTING BOOKINGS
bookingRouter.get("/bookings/:date/:personAmount", async (req,res)=>{
  
  if(req.params.personAmount < 7){
    const tableAmount = "1"
    try{
        let bookings = await BookingModel.find({date : req.params.date})
        const bookingSeatingOne = bookings.filter((booking) => booking.seating === "18.00")
        const bookingSeatingTwo = bookings.filter((booking) => booking.seating === "21.00")

        // CALULATE AMOUNT OF TABLES BOOKED PER SEATING
        let tableSumSeatingOne = 0
        let tableSumSeatingTwo = 0
  
        for (let i = 0; i < bookingSeatingOne.length; i++) {
          tableSumSeatingOne += parseInt(bookingSeatingOne[i].tableAmount)
        }
  
        for (let i = 0; i < bookingSeatingTwo.length; i++) {
          tableSumSeatingTwo += parseInt(bookingSeatingTwo[i].tableAmount)
        }

        //SEND RESPONSE AND TABLEAMOUNT BACK TO CLIENT
        if(tableSumSeatingOne > 14 && tableSumSeatingTwo > 14){
          res.status(200).json({'message' : "Everything is booked", 'tableAmount': tableAmount});
        }else if(tableSumSeatingOne > 14 && tableSumSeatingTwo < 15){
          res.status(200).json({'message' : "seating two possible", 'tableAmount': tableAmount});
        }else if (tableSumSeatingOne < 15 && tableSumSeatingTwo > 14){
          res.status(200).json({'message' : "seating one possible", 'tableAmount': tableAmount});
        }else{
          res.status(200).json({'message' : "booking is possible", 'tableAmount': tableAmount});
        }
    }catch(error) {
        res.sendStatus(404)
    }
  }else{
    const tableAmount = "2"

    try{
      let bookings = await BookingModel.find({date : req.params.date})
      const bookingSeatingOne = bookings.filter((booking) => booking.seating === "18.00")
      const bookingSeatingTwo = bookings.filter((booking) => booking.seating === "21.00")

      // CALULATE AMOUNT OF TABLES BOOKED PER SEATING
      let tableSumSeatingOne = 0
      let tableSumSeatingTwo = 0

      for (let i = 0; i < bookingSeatingOne.length; i++) {
        tableSumSeatingOne += parseInt(bookingSeatingOne[i].tableAmount)
      }

      for (let i = 0; i < bookingSeatingTwo.length; i++) {
        tableSumSeatingTwo += parseInt(bookingSeatingTwo[i].tableAmount)
      }
      
      //SEND RESPONSE AND TABLEAMOUNT BACK TO CLIENT
      if(tableSumSeatingOne > 13 && tableSumSeatingTwo > 13){
        res.status(200).json({'message' : "Everything is booked", 'tableAmount': tableAmount});
      }else if(tableSumSeatingOne > 13 && tableSumSeatingTwo < 13){
        res.status(200).json({'message' : "seating two possible", 'tableAmount': tableAmount});
      }else if (tableSumSeatingOne < 13 && tableSumSeatingTwo > 13){
        res.status(200).json({'message' : "seating one possible", 'tableAmount': tableAmount});
      }else{
        res.status(200).json({'message' : "booking is possible", 'tableAmount': tableAmount});
      }
  }catch(error) {
      res.sendStatus(404)
  }
  }
})

// CREATE NEW BOOKING
bookingRouter.post("/new-booking", async (req, res) => {
    const customer = await CustomerModel.findOne({email : req.body.email})
    
    //BOOK A TABLE WITH EXISTING CUSTOMER
    if(customer){
      const newBooking = new BookingModel({
        date: req.body.date, 
        seating: req.body.seating,
        personAmount: req.body.personAmount,
        customer: customer._id,
        tableAmount: req.body.tableAmount
      });
      await newBooking.save();

      //BOOK A TABLE WITH NEW CUSTOMER
    }else{
      const newCustomer = await CustomerModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      })
  
      let customerNew = await newCustomer.save();
      
      const newBooking = new BookingModel({
        date: req.body.date,
        seating: req.body.seating,
        personAmount: req.body.personAmount,
        customer: customerNew._id,
        tableAmount: req.body.tableAmount
      });
      await newBooking.save();
    }
    
    res.sendStatus(201);
  });

  //DELETE BOOKING FROM LINK IN EMAIL
  bookingRouter.delete("/cancel/:id", async (req, res) => {
    const bookingId = req.params.id
    if(bookingId){
      try {
        await BookingModel.findByIdAndDelete(bookingId)
      } catch (error) {
        console.log(error);
      }
      res.status(200).json({"message" : "Deleted"})
    }
  })

  bookingRouter.get("/cancel/:id", async (req, res)=> {
    const bookingId = req.params.id
    try {
      let booking = await BookingModel.findById(bookingId)
      let customer = await CustomerModel.findById(booking.customer)
      res.status(200).send({booking, customer})
    } catch (error) {
      console.log(error);
    }
  })
 
module.exports = bookingRouter;