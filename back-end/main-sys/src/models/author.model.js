const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
    trim: true,
  },
  style: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  date_of_birth: {
    type: Date,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  published_book: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("author", authorSchema);
