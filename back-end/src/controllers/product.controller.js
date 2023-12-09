const Author = require("../models/author.model");
const Product = require("../models/product.model");
const { upload, uploadToImgur } = require("../middlewares/upload-file");
const { client } = require("../middlewares/imgur");
const path = require("path");
const fs = require("fs");
const Order = require("../models/order.model");
const Account = require("../models/account.model");

const { mongooseToObject, roundNumber } = require("../utils/mongoose");
class productController {
  // [GET] product/best-seller
  getBestSeller = async (req, res, next) => {
    try {
      const bestSeller = await Product.aggregate([
        {
          $addFields: {
            reviewsCount: { $size: "$reviews" }, // Tính kích thước của mảng reviews và thêm vào trường mới
          },
        },
        {
          $sort: { reviewsCount: -1 }, // Sắp xếp theo số lượng đánh giá giảm dần
        },
        {
          $limit: 5, // Giới hạn kết quả trả về cho 5 sản phẩm
        },
      ]);
      res.status(200).json(bestSeller);
    } catch (error) {
      next(error);
    }
  };
  // [GET] product/top-rated
  getTopRatedBook = async (req, res, next) => {
    try {
      const topRatedProducts = await Product.aggregate([
        {
          $addFields: {
            averageRating: {
              $avg: "$reviews.rating", // Tính trung bình các rating trong mảng reviews
            },
          },
        },
        {
          $sort: { averageRating: -1 }, // Sắp xếp giảm dần theo trung bình rating
        },
        {
          $limit: 5, // Giới hạn kết quả trả về cho 5 sản phẩm
        },
      ]);
      res.status(200).json(topRatedProducts);
    } catch (error) {
      next(error);
    }
  };
  // [GET] product/shop
  getShop = async (req, res, next) => {
    try {
      const products = await Product.find({}).populate("id_author");
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };
  // [GET] product/detail/:id
  getDetail = async (req, res, next) => {
    try {
      const product = await Product.findOne({ _id: req.params.id })
        .populate("id_author")
        .populate("reviews.id_account");
      const relatedProducts = await Product.find({
        category: product.category,
        _id: { $ne: product._id },
      });
      res.status(200).json({ product, relatedProducts });
    } catch (error) {
      next(error);
    }
  };

  // [GET] product/checkout
  getCheckout = async (req, res, next) => {
    try {
      // ID_USER
      let id_account = "6572ae4ecbdcc4811d90a8e4";

      let account = await Account.findOne({ _id: id_account }).populate({
        path: "cart.id_product",
        model: Product,
      });

      let totalSum = account.cart.reduce((sum, item) => {
        let price = item.id_product.price;
        let quantity = item.quantity;

        item.subtotal = roundNumber(price * quantity, 2);
        let total = roundNumber(sum + item.subtotal, 2);
        return total;
      }, 0);

      account = mongooseToObject(account);
      account.total_price = totalSum;

      // console.log(account);

      res.status(200).json(account);
    } catch (error) {
      next(error);
    }
  };

  // *************** ADMIN *********************
  // [GET] product/dashboard
  getManage = async (req, res, next) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };
  // [GET] product/edit
  getEdit = async (req, res, next) => {
    try {
      const product = await Product.findOne({ _id: req.params.id }).populate(
        "id_author"
      );
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };
  // [POST] product/edit/save
  addProduct = async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        // Tìm id_author ứng với author_name
        const author = await Author.findOne({ name: req.body.author_name });
        delete req.body.author_name;
        req.body.id_author = author._id;
        if (req.file) {
          // Upload the file to Imgur
          const imgurLink = await uploadToImgur(req.file.buffer);
          // Do something with the Imgur link (e.g., save it to a database)
          req.body.image = imgurLink;
        } else req.body.image = "https://i.imgur.com/D8pnlgT.jpg";
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json({ msg: "Added Product" });
        // return res.status(200).send({ imgurLink });
      });
    } catch (error) {
      next(error);
    }
  };
  // [POST] product/edit/save
  updateProduct = async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        // Tìm id_author ứng với author_name
        const author = await Author.findOne({ name: req.body.author_name });
        delete req.body.author_name;
        req.body.id_author = author._id;
        // Update link ảnh nếu có
        if (req.file) {
          const imgurLink = await uploadToImgur(req.file.buffer);
          req.body.image = imgurLink;
        }
        await Product.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json({ msg: "Updated Product" });
      });
    } catch (error) {
      next(error);
    }
  };

  // [POST] product/delete/:id
  deleteProduct = async (req, res, next) => {
    try {
      await Product.deleteOne({ _id: req.params.id });
      res.status(200).json({ msg: "Deleted Product" });
    } catch (err) {
      next(err);
    }
  };

  //[POST] /handle-review/:id
  handleReview = async (req, res, next) => {
    try {
      let id_account = "6572ae4ecbdcc4811d90a8e4";
      let idProduct = req.params.id;

      let content = req.body.comment;
      let rating = parseInt(req.body.rating);
      let idOrder = req.body.idOrder;
      let orderIndex = req.body.orderIndex;

      const review = {
        id_account,
        rating,
        content,
        date: new Date(),
      };

      // console.log(, req.body.orderIndex);

      const updatedProduct = await Product.findOneAndUpdate(
        { _id: idProduct },
        { $push: { reviews: review } },
        { new: true }
      );

      const updatedOrder = await Order.findOneAndUpdate(
        { _id: idOrder },
        { $set: { [`detail.${orderIndex}.isReviewed`]: true } },
        { new: true }
      );

      // console.log(updatedOrder);

      res.status(200).json({ msg: "success" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new productController();
