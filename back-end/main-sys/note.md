const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
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
  }
);

module.exports = mongoose.model("product", productSchema);
