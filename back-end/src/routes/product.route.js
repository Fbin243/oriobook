const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();

router.get("/best-seller", productController.getBestSeller);
router.get("/top-rated", productController.getTopRatedBook);
router.get("/shop", productController.getShop);
router.get("/detail/:id", productController.getDetail);
router.get("/checkout", productController.getCheckout);
router.post("/handle-review/:id", productController.handleReview);
router.get("/search", productController.searchProduct);
router.get("/sort", productController.sortProduct);

// **************** ADMIN **********************
router.get("/manage", productController.getManage);
router.get("/edit/:id", productController.getEdit);
router.post("/edit/save", productController.addProduct);
router.post("/edit/save/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
