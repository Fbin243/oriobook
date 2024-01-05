const mongoose = require("mongoose");
const account = require("./account.model");
const author = require("./author.model");

const productSchema = new mongoose.Schema(
  {
    id_author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      // type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      default: () => new Date().getFullYear(),
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
    },
    sub_category: {
      type: String,
    },
    reviews: {
      type: [
        {
          id_account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "account",
            // type: String,
          },
          rating: {
            type: Number,
            min: 0,
            max: 5,
          },
          content: {
            type: String,
            trim: true,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { strictPopulate: false }
);

module.exports = mongoose.model("product", productSchema);
