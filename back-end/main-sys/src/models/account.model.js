const mongoose = require("mongoose");
const product = require("./product.model");

const accountSchema = new mongoose.Schema({
  firstName: { type: String, default: "", trim: true },
  lastName: { type: String, default: "", trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: { type: String, required: true, trim: true },
  isAdmin: { type: Boolean, default: false },
  phone: { type: String, default: "", trim: true },
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
  date: {
    type: Date,
    default: Date.now,
  },
  history: [
    {
      action: {
        type: String,
        require: true,
        enum: ["Paid", "Received"],
      },
      changeBalance: { type: String, require: true, default: "-" },
      atTimeBalance: { type: Number, require: true},
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  token: {
    type: String,
    default: '',
    require: true,
  },
});

module.exports = mongoose.model("account", accountSchema);
