const Product = require("../models/product.model");
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
      const product = await Product.findOne({ _id: req.params.id }).populate(
        "id_author"
      );
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
      let id_account = '6572ae4ecbdcc4811d90a8e4'

      let account = await Account.findOne({_id: id_account}).populate({
        path: 'cart.id_product',
        model: Product,
      });

      let totalSum = account.cart.reduce((sum, item) => {
        let price = item.id_product.price;
        let quantity = item.quantity;

        item.subtotal = roundNumber(price * quantity, 2)
        let total = roundNumber(sum + item.subtotal, 2)
        return total;
      }, 0);
      
      account = mongooseToObject(account)
      account.total_price = totalSum

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

  //[POST] /handle-review/:id
  handleReview = async (req, res, next) => {
    try {
      let id_account = '6572ae4ecbdcc4811d90a8e4'
      let idProduct = req.params.id

      let content = req.body.comment
      let rating = parseInt(req.body.rating)
      let idOrder = req.body.idOrder
      let orderIndex = req.body.orderIndex

      const review = {
        id_account,
        rating,
        content,
        date: new Date(),
      };

      // console.log(, req.body.orderIndex);

      const updatedProduct = await Product.findOneAndUpdate(
        { "_id": idProduct },
        { $push: { "reviews": review } },
        { new: true }
      );

      const updatedOrder = await Order.findOneAndUpdate(
        { "_id": idOrder },
        { $set: { [`detail.${orderIndex}.isReviewed`]: true } },
        { new: true }
      );

      // console.log(updatedOrder);

      res.status(200).json({ msg: 'success' });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new productController();
