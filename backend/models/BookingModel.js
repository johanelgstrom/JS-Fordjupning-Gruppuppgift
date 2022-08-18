const { model, Schema } = require("mongoose");

const bookingSchema = new Schema(
  {
    date: { type: Date, required: true }, //Date kommer hämtas från react calendar
    seating: { type: String, required: true }, // 1 är 18:00, 2 är 21:00
    tableamount: { type: String, required: true }, //antal bord
    customer: { type: Schema.Types.ObjectId, ref: "Customers", required: true }, //lägg in <required: true> vid senare tillfälle
  },
  { versionKey: false }
);

const BookingModel = model("Bookings", bookingSchema);

module.exports = BookingModel;
