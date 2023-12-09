const mongoose = require("mongoose");
const product = require("./product.model");

const accountSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: { type: String, required: true, trim: true },
  isAdmin: Boolean,
  phone: { type: String, required: true, trim: true },
  address: { type: String, default: "", trim: true },
  cart: [
    {
      id_product: {
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
