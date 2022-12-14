const express = require("express");
const adminRouter = express.Router();

const BookingModel = require("../models/BookingModel.js");
const CustomerModel = require("../models/CustomerModel.js");

// [ADMIN] HÄMTA ALLA BOKNINGAR
adminRouter.get("/all-bookings", async (req, res) => {
  const bookings = await BookingModel.find().lean();
  res.send(bookings);
});

adminRouter.get("/all-bookings/:date", async (req, res) => {
  const bookingsByDate = await BookingModel.find({ date: req.params.date });
  const bookingSeatingOne = bookingsByDate.filter(
    (booking) => booking.seating === "18.00"
  );
  const bookingSeatingTwo = bookingsByDate.filter(
    (booking) => booking.seating === "21.00"
  );

  // CALULATE AMOUNT OF TABLES BOOKED PER SEATING
  let tableSumSeatingOne = 0;
  let tableSumSeatingTwo = 0;

  for (let i = 0; i < bookingSeatingOne.length; i++) {
    tableSumSeatingOne += parseInt(bookingSeatingOne[i].tableAmount);
  }

  for (let i = 0; i < bookingSeatingTwo.length; i++) {
    tableSumSeatingTwo += parseInt(bookingSeatingTwo[i].tableAmount);
  }


  res.status(200).send({bookingsByDate, tableSumSeatingTwo, tableSumSeatingOne})
});

adminRouter.get("/customers/:id", async (req, res) => {
  const customer = await CustomerModel.find({ _id: req.params.id });

  res.send(customer);
});

adminRouter.delete("/customers/delete/:idDelete", async (req, res) => {
  await BookingModel.deleteOne({ _id: req.params.idDelete });

  res.status(200).json({ message: "deleted" });
});

adminRouter.post("/customers", async (req, res) => {
  await CustomerModel.create(req.body).then(function (postCustomer) {
    res.send(postCustomer);
  });
});

adminRouter.post("/bookings", async (req, res) => {
  await BookingModel.create(req.body).then(function (postBookings) {
    res.send(postBookings);
  });
});

adminRouter.put("/customers/:idUpdate", async (req, res) => {
  const id = req.params.idUpdate
  const myUpdate = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  }
  const update = await CustomerModel.findByIdAndUpdate(id, myUpdate, {
    new: true
  })

  res.send(update)

});

adminRouter.put("/bookings/:idUpdate", async (req, res) => {
  const id = req.params.idUpdate;
  const myUpdate = {
    date: req.body.date,
    seating: req.body.seating,
    personAmount: req.body.personAmount,
    tableAmount: req.body.tableAmount,
    customer: req.body.customer,
  }

  const update = await BookingModel.findByIdAndUpdate(id, myUpdate, {
      new: true
    }
    )

    res.send(update)

});

module.exports = adminRouter;
