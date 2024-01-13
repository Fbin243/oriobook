const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  sub_category: {
    type: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "category",
        },
      },
    ],
    default: [],
  },
  isMain: {
    type: Boolean,
    default: false,
  },
  num_product: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("category", categorySchema);
