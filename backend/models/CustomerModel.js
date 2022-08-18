const { Schema, model } = require("mongoose");

const customersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
});

const CustomerModel = model("Customers", customersSchema);

module.exports = CustomerModel;
