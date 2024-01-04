const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  email: { type: String, require: true },
  balance: { type: Number, default: 0, require: true },
  history: [
    {
      action: {
        type: String,
        require: true,
        enum: ["Paid", "Received", "Deposited", "Restored"],
      },
      changeBalance: { type: String, require: true },
      atTimeBalance: { type: Number, require: true },
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("account", paymentSchema);
