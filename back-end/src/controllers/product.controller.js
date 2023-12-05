const Product = require("../models/product.model");
class productController {
  // [GET] product/shop
  getShop = async (req, res, next) => {
    try {
      const products = await Product.find({}).populate("id_author");
      console.log(products);
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
      // console.log(product.relatedProducts, "relate");
      console.log(product);
      res.status(200).json({ product, relatedProducts });
    } catch (error) {
      next(error);
    }
  };
  // [GET] product/dashboard
  getDashboard = async (req, res, next) => {
    try {
      res.send("OK");
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new productController();
