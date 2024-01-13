const mongoose = require("mongoose");
const Account = require("./account.model");
const Product = require("./product.model");

const orderSchema = new mongoose.Schema({
  id_account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
  },
  detail: [
    {
      id_product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      product: {
        type: Object,
        default: {},
        // required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      isReviewed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  status: {
    type: String,
    enum: ["Cancelled", "Pending", "Successful"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
    default: "",
    trim: true,
  },
});

// Sử dụng pre hook để populate trường product trước khi lưu vào cơ sở dữ liệu
// orderSchema.pre('save', async function (next) {
//   try {
//     // Lặp qua từng chi tiết trong detail
//     for (let i = 0; i < this.detail.length; i++) {
//       const productId = this.detail[i].id_product;

//       // Thực hiện populate để lấy thông tin product từ Product model
//       const product = await Product.findById(productId);
//       console.log(product.toObject());
//       this.detail[i].product = product.toObject(); // Gán thông tin product vào trường product trong detail
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = mongoose.model("order", orderSchema);
