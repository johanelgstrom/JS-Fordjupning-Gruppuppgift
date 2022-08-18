const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
  date: { type: Date, required: true },
  seating: { type: Number, required: true },
  tableamount: { type: Number, required: true },
  customer: { type: Schema.Types.ObjectId, ref: "Customers", required: true },
});

const BookingModel = model("Bookings", bookingSchema);

module.export = BookingModel;
