const Author = require("../models/author.model");
const Product = require("../models/product.model");
const { upload, uploadToImgur } = require("../middlewares/upload-file");
const { client } = require("../middlewares/imgur");
const path = require("path");
const fs = require("fs");
const Order = require("../models/order.model");
const Account = require("../models/account.model");
const Category = require("../models/category.model");

const axios = require("axios");
const https = require("https");
const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const { mongooseToObject, roundNumber } = require("../utils/mongoose");
async function findAuthorIdByName(authorName) {
  const author = await Author.findOne({
    name: { $regex: new RegExp(authorName, "i") },
  });
  return author ? author._id : null;
}
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
      console.log(req.query);
      const page = isNaN(req.query.page)
        ? 1
        : Math.max(1, parseInt(req.query.page));
      const perPage = isNaN(req.query.perPage)
        ? 8
        : Math.max(1, parseInt(req.query.perPage));
      let { search, sort, category, author } = req.query;

      // Match option cho search, category, author
      const matchOption =
        search != "" ? { name: { $regex: new RegExp(search, "i") } } : {};
      if (category != "") {
        category = await Category.findOne({
          name: { $regex: new RegExp(category, "i") },
        }).populate("sub_category._id");
        console.log(category);
        if (category.isMain) {
          // Tạo ra 1 list gồm tên main category và sub category
          const categoryIDs = [category._id];
          for (let subCate of category.sub_category) {
            categoryIDs.push(subCate._id._id);
          }
          matchOption.$or = categoryIDs.map((item) => ({
            id_category: item,
          }));
        } else matchOption.id_category = category._id;
      }
      if (author != "") {
        author = await Author.findOne({
          name: { $regex: new RegExp(author, "i") },
        });
        matchOption.id_author = author._id;
      }

      // Sort option
      let sortOption = { date: 1 };
      if (sort == "price") sortOption = { price: 1 };
      else if (sort == "price-desc") sortOption = { price: -1 };
      else if (sort == "latest") sortOption = { date: -1 };
      else if (sort == "rating") sortOption = { avgRating: -1 };

      // Lấy sản phẩm thỏa mãn tất cả matchOption
      const totalProducts = await Product.countDocuments(matchOption);
      const totalPages = Math.ceil(totalProducts / perPage);
      const pineline = [
        {
          $match: matchOption,
        },
        {
          $lookup: {
            from: "authors", // Tên của collection bạn muốn tham chiếu
            localField: "id_author", // Trường trong collection hiện tại (orders)
            foreignField: "_id", // Trường trong collection từng được tham chiếu (users)
            as: "id_author", // Tên của trường trong kết quả chứa thông tin từ collection tham chiếu
          },
        },
        {
          $addFields: {
            avgRating: { $avg: "$reviews.rating" },
          },
        },
        {
          $sort: sortOption,
        },
        {
          $skip: (page - 1) * perPage,
        },
        {
          $limit: perPage,
        },
      ];
      const products = await Product.aggregate(pineline);
      res.status(200).json({ products, totalPages });
    } catch (error) {
      next(error);
    }
  };

  // [GET] product/hot
  getNewest = async (req, res, next) => {
    try {
      // Sorting option for date in descending order (latest to oldest)
      const sortOption = { date: -1 };

      // Fetch the products with search and sorting options
      const products = await Product.find()
        .populate("id_author")
        .sort(sortOption)
        .limit(4);

      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  };

  // [GET] product/detail/:id
  getDetail = async (req, res, next) => {
    try {
      let product = await Product.findOne({ _id: req.params.id })
        .populate("id_author")
        .populate("reviews.id_account")
        .populate("id_category");
      let sum = 0;
      let productRating = 0;
      for (let review of product.reviews) {
        sum += review.rating;
      }
      if (product.reviews.length > 0)
        productRating = (sum / product.reviews.length).toFixed(1);
      // Cắt bớt revỉew list
      product.reviews = product.reviews.reverse().slice(0, 6);
      const relatedProducts = await Product.find({
        id_category: product.id_category._id,
        _id: { $ne: product._id },
      });
      res.status(200).json({ product, relatedProducts, productRating });
    } catch (error) {
      next(error);
    }
  };
  // [GET] product/productAuthor/:id
  productAuthor = async (req, res, next) => {
    try {
      const products = await Product.find({ id_author: req.params.id })
        .populate("id_author")
        .populate("reviews.id_account");

      if (!products || products.length === 0) {
        return res
          .status(404)
          .json({ message: "No products found for this author ID." });
      }

      const author = products[0].id_author; // Assuming all products have the same author

      const relatedProducts = await Product.find({
        category: products[0].category, // Assuming all products have the same category
        id_author: { $ne: req.params.id },
      });

      res.status(200).json({ products, author, relatedProducts });
    } catch (error) {
      next(error);
    }
  };

  // [GET] product/checkout
  getCheckout = async (req, res, next) => {
    try {
      // ID_USER
      let email = req.headers ? req.headers.email : "";
      // let id_account = "6572ae4ecbdcc4811d90a8e4";

      let account = await Account.findOne({ email }).populate({
        path: "cart.id_product",
        model: Product,
      });

      let totalSum = account.cart.reduce((sum, item) => {
        let price = item.id_product ? item.id_product.price : "";
        let quantity = item.quantity;

        item.subtotal = roundNumber(price * quantity, 2);
        let total = roundNumber(sum + item.subtotal, 2);
        return total;
      }, 0);

      account = mongooseToObject(account);
      account.total_price = totalSum;

      let dataSend = {
        paymentToken: account.token,
      };

      const response = await instance.post(
        `https://localhost:${process.env.AUX_PORT}/get-balance`,
        dataSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let data = response.data;
      if (data.result === "success") {
        account.balance = data.balance;
      }

      res.json(account);
    } catch (error) {
      next(error);
    }
  };

  // *************** ADMIN *********************
  // [GET] product/dashboard
  getManage = async (req, res, next) => {
    try {
      const page = isNaN(req.query.page)
        ? 1
        : Math.max(1, parseInt(req.query.page));
      const perPage = isNaN(req.query.perPage)
        ? 4
        : Math.max(1, parseInt(req.query.perPage));
      const totalProducts = await Product.countDocuments({});
      const totalPages = Math.ceil(totalProducts / perPage);
      const products = await Product.find({})
        .populate("id_category")
        .skip((page - 1) * perPage)
        .limit(perPage);
      res.status(200).json({ products, totalPages });
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
      let email = req.headers ? req.headers.email : "";
      let account = await Account.findOne({ email });

      let id_account = account ? account._id : "";
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

      res.status(200).json({ msg: "success" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new productController();
