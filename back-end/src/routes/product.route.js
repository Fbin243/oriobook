const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();

router.get("/best-seller", productController.getBestSeller);
router.get("/top-rated", productController.getTopRatedBook);
router.get("/shop", productController.getShop);
router.get("/detail/:id", productController.getDetail);
router.get("/dashboard", productController.getDashboard);

module.exports = router;
