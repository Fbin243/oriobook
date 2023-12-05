const mongoose = require("mongoose");
const account = require("./account.model");

const productSchema = new mongoose.Schema({
  id_author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    default: "Romance",
    enum: ["Romance", "Fiction", "Family", "Comedy", "History", "Other"],
  },
  reviews: [
    {
      id_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
      },
      rating: Number,
      content: String,
      date: Date,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("product", productSchema);
