const mongoose = require("mongoose");
const product = require("./product.model");

const accountSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  isAdmin: Boolean,
  phone: { type: String, required: true },
  address: { type: String, default: "" },
  cart: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: Number,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("account", accountSchema);
