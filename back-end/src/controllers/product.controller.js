const Author = require("../models/author.model");
const Product = require("../models/product.model");
const { upload, uploadToImgur } = require("../middlewares/upload-file");
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
        console.log(req.body);
        delete req.body.author_name;
        console.log(req.file);
        // console.log(typeof req.body.image);
        if (req.file) {
          // Upload the file to Imgur
          const imgurLink = await uploadToImgur(req.file.buffer);
          // Do something with the Imgur link (e.g., save it to a database)
          console.log(imgurLink);
          req.body.image = imgurLink;
        } else req.body.image = "https://i.imgur.com/D8pnlgT.jpg";
        req.body.id_author = author._id;
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json({ msg: "Added Product" });
        // return res.status(200).send({ imgurLink });
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new productController();
