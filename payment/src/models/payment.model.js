const mongoose = require("mongoose");

const paymentModel = new mongoose.Schema({
  balance: { type: Number, default: 0, require: true },
  history: [
    {
      action: { type: String, require: true },
      atTimeBalance: { type: Number, require: true },
    },
  ],
});

module.exports = mongoose.model("payment", paymentModel);
