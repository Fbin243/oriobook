const Author = require("../models/author.model");
const Product = require("../models/product.model");
const { upload, uploadToImgur } = require("../middlewares/upload-file");
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

  // [GET] product/top-rated
  getAuthorList = async (req, res, next) => {
    try {
      const authorList = await Author.find();
      res.status(200).json(authorList);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new authorController();
