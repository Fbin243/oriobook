const mongoose = require("mongoose");
const account = require("./account.model");
const product = require("./product.model");

const orderSchema = new mongoose.Schema({
  id_account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
  },
  detail: [
    {
      id_product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      isReviewed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  status: {
    type: String,
    enum: ["Cancelled", "Pending", "Successful"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("order", orderSchema);
