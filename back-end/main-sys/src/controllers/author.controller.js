const Author = require("../models/author.model");
const Product = require("../models/product.model");
const { upload, uploadToImgur } = require("../middlewares/upload-file");
const { adjustCategoryOrAuthor } = require("../utils/adjustCategoryOrAuthor");

class authorController {
  // [GET] product/detail/:id
  getDetail = async (req, res, next) => {
    try {
      const author = await Author.findOne({ _id: req.params.id });

      res.status(200).json({ author });
    } catch (error) {
      next(error);
    }
  };

  // [GET] author/list
  getAuthorList = async (req, res, next) => {
    try {
      const page = isNaN(req.query.page)
        ? 1
        : Math.max(1, parseInt(req.query.page));
      const perPage = isNaN(req.query.perPage)
        ? 6
        : Math.max(1, parseInt(req.query.perPage));
      const totalAuthors = await Author.countDocuments({});
      const totalPages = Math.ceil(totalAuthors / perPage);
      const authors = await Author.find()
        .skip((page - 1) * perPage)
        .limit(perPage);
      res.status(200).json({ authors, totalPages });
    } catch (error) {
      next(error);
    }
  };

  // [GET] author/all
  getAllAuthors = async (req, res, next) => {
    try {
      const authors = await Author.find();
      res.status(200).json(authors);
    } catch (error) {
      next(error);
    }
  };

  // [GET] product/top-rated
  getAuthorListTopRated = async (req, res, next) => {
    try {
      // Retrieve all authors
      const authors = await Author.find();

      // Calculate average rating for each author
      const authorsWithAvgRating = await Promise.all(
        authors.map(async (author) => {
          // Retrieve products for the current author
          const products = await Product.find({
            id_author: author._id,
          }).populate("reviews");

          // Calculate the average rating for the products of the current author
          const totalRating = products.reduce((sum, product) => {
            const productRatingSum = product.reviews.reduce(
              (ratingSum, review) => ratingSum + review.rating,
              0
            );
            return sum + productRatingSum;
          }, 0);

          const avgRating =
            products.length > 0 ? totalRating / products.length : 0;

          return {
            ...author.toObject(),
            avgRating,
          };
        })
      );

      // Sort authors by average rating in descending order
      const sortedAuthors = authorsWithAvgRating.sort(
        (a, b) => b.avgRating - a.avgRating
      );

      res.status(200).json(sortedAuthors.slice(0, 6));
    } catch (error) {
      next(error);
    }
  };

  // *************** ADMIN *********************
  // [GET] author/dashboard
  getManageAuthor = async (req, res, next) => {
    try {
      const page = isNaN(req.query.page)
        ? 1
        : Math.max(1, parseInt(req.query.page));
      const perPage = isNaN(req.query.perPage)
        ? 4
        : Math.max(1, parseInt(req.query.perPage));
      const searchOption = req.query.search
        ? { name: { $regex: new RegExp(req.query.search, "i") } }
        : {};
      const totalAuthors = await Author.countDocuments(searchOption);
      const totalPages = Math.ceil(totalAuthors / perPage);
      const authors = await Author.find(searchOption)
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ date: -1 });
      res.status(200).json({ authors, totalPages });
    } catch (error) {
      next(error);
    }
  };

  // [GET] product/edit
  getEditAuthor = async (req, res, next) => {
    try {
      const author = await Author.findOne({ _id: req.params.id });
      res.status(200).json(author);
    } catch (error) {
      next(error);
    }
  };

  // [POST] product/edit/save
  addAuthor = async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        if (req.file) {
          // Upload the file to Imgur
          const imgurLink = await uploadToImgur(req.file.buffer);
          // Do something with the Imgur link (e.g., save it to a database)
          req.body.image = imgurLink;
        } else req.body.image = "https://i.imgur.com/D8pnlgT.jpg";
        req.body.date_of_birth = new Date(req.body.date_of_birth);
        const newAuthor = new Author(req.body);
        await newAuthor.save();
        res.status(200).json({ msg: "Added Author" });
        // return res.status(200).send({ imgurLink });
      });
    } catch (error) {
      next(error);
    }
  };

  // [POST] product/edit/save
  updateAuthor = async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        req.body.date_of_birth = new Date(req.body.date_of_birth);
        // Update link ảnh nếu có
        if (req.file) {
          const imgurLink = await uploadToImgur(req.file.buffer);
          req.body.image = imgurLink;
        }
        await Author.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json({ msg: "Updated Author" });
      });
    } catch (error) {
      next(error);
    }
  };

  // [POST] product/delete/:id
  deleteAuthor = async (req, res, next) => {
    try {
      console.log("DELETE AUTHOR");
      // Tìm ra tất cả những sp của tác giả cần xóa
      const removeProducts = await Product.find({ id_author: req.params.id });
      console.log("San pham cua tac gia can xoa: ", removeProducts);
      for (let product of removeProducts) {
        await adjustCategoryOrAuthor(product.id_category, -1);
      }
      // Xóa hết tất cả sp của tác giả
      await Product.deleteMany({ id_author: req.params.id });
      // Xóa tác giả
      await Author.deleteOne({ _id: req.params.id });
      res.status(200).json({ msg: "Delete author successfully!" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new authorController();
