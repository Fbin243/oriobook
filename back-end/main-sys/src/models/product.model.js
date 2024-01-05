const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id_author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
    },
    id_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
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
    reviews: {
      type: [
        {
          id_account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "account",
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
