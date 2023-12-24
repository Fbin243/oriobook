const express = require("express");
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const adminMiddleware = require("../middlewares/admin.middlewares");
const router = express.Router();

const isAuth = authMiddleware.isAuth;
const isAdmin = adminMiddleware.isAdmin;

router.get("/best-seller", productController.getBestSeller);
router.get("/top-rated", productController.getTopRatedBook);
router.get("/shop", productController.getShop);
router.get("/shopSerach", productController.getShopBetter);
router.get("/shopSort", productController.getShopBetterSort);
router.get("/shopSeek", productController.getShopBetterFilter);
router.get("/hot", productController.getNewest);
router.get("/search", productController.searchProduct);
router.get("/sort", productController.sortProduct);
router.get("/detail/:id", productController.getDetail);
router.get("/productAuthor/:id", productController.productAuthor);

// **************** USER **********************
router.post("/handle-review/:id", isAuth, productController.handleReview);
router.get("/checkout", isAuth, productController.getCheckout);

// **************** ADMIN **********************
router.get("/manage", isAdmin, productController.getManage);
router.get("/edit/:id", isAdmin, productController.getEdit);
router.post("/edit/save", isAdmin, productController.addProduct);
router.post("/edit/save/:id", isAdmin, productController.updateProduct);
router.delete("/delete/:id", isAdmin, productController.deleteProduct);

module.exports = router;
