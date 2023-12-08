const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();

router.get("/best-seller", productController.getBestSeller);
router.get("/top-rated", productController.getTopRatedBook);
router.get("/shop", productController.getShop);
router.get("/detail/:id", productController.getDetail);

router.post("/handle-review/:id", productController.handleReview);

// **************** ADMIN **********************
router.get("/manage", productController.getManage);
router.get("/edit/:id", productController.getEdit);

module.exports = router;
