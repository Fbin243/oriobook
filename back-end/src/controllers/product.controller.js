const Author = require("../models/author.model");
const Product = require("../models/product.model");
const { upload, uploadToImgur } = require("../middlewares/upload-file");
const { client } = require("../middlewares/imgur");
const path = require("path");
const fs = require("fs");
const Order = require("../models/order.model");
const Account = require("../models/account.model");

const { mongooseToObject, roundNumber } = require("../utils/mongoose");
async function findAuthorIdByName(authorName) {
  const author = await Author.findOne({ name: { $regex: new RegExp(authorName, 'i') } });
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
      const page = isNaN(req.query.page)
        ? 1
        : Math.max(1, parseInt(req.query.page));
      const perPage = isNaN(req.query.perPage)
        ? 8
        : Math.max(1, parseInt(req.query.perPage));
      const totalProducts = await Product.countDocuments({});
      const totalPages = Math.ceil(totalProducts / perPage);
      const products = await Product.find({})
        .populate("id_author")
        .skip((page - 1) * perPage)
        .limit(perPage);
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

  
  

  getShopBetterFilter = async (req, res, next) => {
    try {
      const page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));
      const perPage = isNaN(req.query.perPage) ? 8 : Math.max(1, parseInt(req.query.perPage));
  
      // Extract category and author from query parameters
      let category = req.query.category;
      let author = req.query.author;

      if(category == "All Category"){category = ''}
      if(category == "Family Story"){category = 'Family story'}
      if(author == "Book Author"){author = ''}
      console.log(category)
      console.log(author)
      // Build the query based on case-insensitive category and author conditions
      const query = {};
if (category || author) {


  if (category) {
    query.category = { $regex: new RegExp(category, 'i') };
  }
  
  if (author) {
    const authorId = await findAuthorIdByName(author);

    query['id_author'] = authorId;
  }
}

// Find the total number of matching products
const totalProducts = await Product.countDocuments(query);

// Calculate total pages
const totalPages = Math.ceil(totalProducts / perPage);

// Fetch products based on the query
const products = await Product.find(query)
  .populate("id_author")
  .skip((page - 1) * perPage)
  .limit(perPage);

res.status(200).json({ products, totalPages });

    } catch (error) {
      next(error);
    }
  };
  


  getShopBetter = async (req, res, next) => {
    try {
      const page = isNaN(req.query.page)
        ? 1
        : Math.max(1, parseInt(req.query.page));
      const perPage = isNaN(req.query.perPage)
        ? 8
        : Math.max(1, parseInt(req.query.perPage));
      
      const search = req.query.search;
      console.log(search);
      const filter = search
        ? { name: { $regex: new RegExp(search, "i") } }
        : {};

      const totalProducts = await Product.countDocuments({filter});//cập nhật số trang
      const totalPages = Math.ceil(totalProducts+1 / perPage);  
      const products = await Product.find(filter)

        .populate("id_author")
        .skip((page - 1) * perPage)
        .limit(perPage);
      res.status(200).json({ products, totalPages });
    } catch (error) {
      next(error);
    }
  };

  getShopBetterSort = async (req, res, next) => {
    try {
      const page = isNaN(req.query.page)
        ? 1
        : Math.max(1, parseInt(req.query.page));
      const perPage = isNaN(req.query.perPage)
        ? 8
        : Math.max(1, parseInt(req.query.perPage));
      const totalProducts = await Product.countDocuments({});
      const totalPages = Math.ceil(totalProducts / perPage);
      const sort = req.query.sort;
      let search;
      if (req.query.search) {
        console.log("go");
        search = req.query.search;
        if (search == "undefined") {
          search = "";
        }
      }

      const filter = search
        ? { name: { $regex: new RegExp(search, "i") } }
        : {};
      console.log(filter);
      if (sort == "price") {
        // Sorting option for price in ascending order (low to high)
        const sortOption = { price: 1 };
        // Fetch the products with search and sorting options
        const products = await Product.find(filter)
          .populate("id_author")
          .sort(sortOption)
          .skip((page - 1) * perPage)
          .limit(perPage);
        res.status(200).json({ products, totalPages });
      }

      if (sort == "price-desc") {
        // Sorting option for price in ascending order (low to high)
        const sortOption = { price: -1 };
        // Fetch the products with search and sorting options
        const products = await Product.find(filter)
          .populate("id_author")
          .sort(sortOption)
          .skip((page - 1) * perPage)
          .limit(perPage);
        res.status(200).json({ products, totalPages });
      }

      if (sort === "date") {
        // Sorting option for date in descending order (latest to oldest)
        const sortOption = { date: -1 };

        // Fetch the products with search and sorting options
        const products = await Product.find(filter)
          .populate("id_author")
          .sort(sortOption)
          .skip((page - 1) * perPage)
          .limit(perPage);

        res.status(200).json({ products, totalPages });
      }

      if (sort === "popularity") {
        // Aggregation pipeline to add a new field "numReviews" representing the length of the "reviews" array
        const aggregationPipeline = [
          {
            $match: filter, // Your existing match filter
          },
          {
            $addFields: {
              numReviews: { $size: "$reviews" },
            },
          },
          {
            $sort: { numReviews: -1 }, // Sort by the length of the "reviews" array in descending order
          },
          {
            $skip: (page - 1) * perPage,
          },
          {
            $limit: perPage,
          },
        ];

        // Execute the aggregation pipeline
        const products = await Product.aggregate(aggregationPipeline).exec();

        // Fetch the total number of products for pagination
        const totalProducts = await Product.countDocuments(filter);

        res
          .status(200)
          .json({ products, totalPages: Math.ceil(totalProducts / perPage) });
      }

      if (sort === "rating") {
        // Aggregation pipeline to add a new field "averageRating" representing the average rating from the "reviews" array
        const aggregationPipeline = [
          {
            $match: filter, // Your existing match filter
          },
          {
            $addFields: {
              averageRating: { $avg: "$reviews.rating" },
            },
          },
          {
            $sort: { averageRating: -1 }, // Sort by the average rating in descending order
          },
          {
            $skip: (page - 1) * perPage,
          },
          {
            $limit: perPage,
          },
        ];

        // Execute the aggregation pipeline
        const products = await Product.aggregate(aggregationPipeline).exec();

        // Fetch the total number of products for pagination
        const totalProducts = await Product.countDocuments(filter);

        res
          .status(200)
          .json({ products, totalPages: Math.ceil(totalProducts / perPage) });
      }

      if (sort === "menu_order") {
        const products = await Product.find(filter)

          .populate("id_author")
          .skip((page - 1) * perPage)
          .limit(perPage);
        res.status(200).json({ products, totalPages });
      }
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
// [GET] product/productAuthor/:id
productAuthor = async (req, res, next) => {
  try {
    console.log("Running");
    const products = await Product.find({ id_author: req.params.id })
      .populate("id_author")
      .populate("reviews.id_account");

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this author ID." });
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

      res.status(200).json(account);
    } catch (error) {
      next(error);
    }
  };

  searchProduct = async (req, res, next) => {
    try {
      const page = isNaN(req.query.page)
        ? 1
        : Math.max(1, parseInt(req.query.page));
      const perPage = isNaN(req.query.perPage)
        ? 8
        : Math.max(1, parseInt(req.query.perPage));
      const totalProducts = await Product.countDocuments({});
      const search = req.query.search;
      const filter = search
        ? { name: { $regex: new RegExp(search, "i") } }
        : {};

      const totalPages = Math.ceil(totalProducts / perPage);
      const products = await Product.find(filter)

        .populate("id_author")
        .skip((page - 1) * perPage)
        .limit(perPage);
      res.status(200).json({ products, totalPages });
    } catch (error) {
      next(error);
    }
  };

  sortProduct = async (req, res, next) => {
    try {
      const page = isNaN(req.query.page)
        ? 1
        : Math.max(1, parseInt(req.query.page));
      const perPage = isNaN(req.query.perPage)
        ? 8
        : Math.max(1, parseInt(req.query.perPage));
      const totalProducts = await Product.countDocuments({});
      const totalPages = Math.ceil(totalProducts / perPage);
      const sort = req.query.sort;
      let search;
      if (req.query.search) {
        search = req.query.search;
        if (search == "undefined") {
          search = "";
        }
      }

      const filter = search
        ? { name: { $regex: new RegExp(search, "i") } }
        : {};
      if (sort == "price") {
        // Sorting option for price in ascending order (low to high)
        const sortOption = { price: 1 };
        // Fetch the products with search and sorting options
        const products = await Product.find(filter)
          .populate("id_author")
          .sort(sortOption)
          .skip((page - 1) * perPage)
          .limit(perPage);
        res.status(200).json({ products, totalPages });
      }

      if (sort == "price-desc") {
        // Sorting option for price in ascending order (low to high)
        const sortOption = { price: -1 };
        // Fetch the products with search and sorting options
        const products = await Product.find(filter)
          .populate("id_author")
          .sort(sortOption)
          .skip((page - 1) * perPage)
          .limit(perPage);
        res.status(200).json({ products, totalPages });
      }

      if (sort === "date") {
        // Sorting option for date in descending order (latest to oldest)
        const sortOption = { date: -1 };

        // Fetch the products with search and sorting options
        const products = await Product.find(filter)
          .populate("id_author")
          .sort(sortOption)
          .skip((page - 1) * perPage)
          .limit(perPage);

        res.status(200).json({ products, totalPages });
      }

      if (sort === "popularity") {
        // Aggregation pipeline to add a new field "numReviews" representing the length of the "reviews" array
        const aggregationPipeline = [
          {
            $match: filter, // Your existing match filter
          },
          {
            $addFields: {
              numReviews: { $size: "$reviews" },
            },
          },
          {
            $sort: { numReviews: -1 }, // Sort by the length of the "reviews" array in descending order
          },
          {
            $skip: (page - 1) * perPage,
          },
          {
            $limit: perPage,
          },
        ];

        // Execute the aggregation pipeline
        const products = await Product.aggregate(aggregationPipeline).exec();

        // Fetch the total number of products for pagination
        const totalProducts = await Product.countDocuments(filter);

        res
          .status(200)
          .json({ products, totalPages: Math.ceil(totalProducts / perPage) });
      }

      if (sort === "rating") {
        // Aggregation pipeline to add a new field "averageRating" representing the average rating from the "reviews" array
        const aggregationPipeline = [
          {
            $match: filter, // Your existing match filter
          },
          {
            $addFields: {
              averageRating: { $avg: "$reviews.rating" },
            },
          },
          {
            $sort: { averageRating: -1 }, // Sort by the average rating in descending order
          },
          {
            $skip: (page - 1) * perPage,
          },
          {
            $limit: perPage,
          },
        ];

        // Execute the aggregation pipeline
        const products = await Product.aggregate(aggregationPipeline).exec();

        // Fetch the total number of products for pagination
        const totalProducts = await Product.countDocuments(filter);

        res
          .status(200)
          .json({ products, totalPages: Math.ceil(totalProducts / perPage) });
      }

      if (sort === "menu_order") {
        const products = await Product.find(filter)

          .populate("id_author")
          .skip((page - 1) * perPage)
          .limit(perPage);
        res.status(200).json({ products, totalPages });
      }
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
