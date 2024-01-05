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
});

module.exports = mongoose.model("category", categorySchema);