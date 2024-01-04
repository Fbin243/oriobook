const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  id_account: { type: String, require: true },
  balance: { type: Number, default: 0, require: true },
  history: [
    {
      action: {
        type: String,
        require: true,
        enum: ["Paid", "Received", "Deposited", "Pending"],
      },
      changeBalance: { type: String, require: true },
      atTimeBalance: { type: Number, require: true },
    },
  ],
});

module.exports = mongoose.model("account", paymentSchema);
