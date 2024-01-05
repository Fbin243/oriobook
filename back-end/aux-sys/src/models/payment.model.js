const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  email: { type: String, require: true },
  balance: { type: Number, default: 0, require: true },
});

module.exports = mongoose.model("account", paymentSchema);
