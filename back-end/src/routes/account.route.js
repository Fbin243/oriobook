const express = require("express");
const accountController = require("../controllers/account.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const router = express.Router();

const isAuth = authMiddleware.isAuth;

// Implement các hàm backend ở đây
router.post("/signUp", accountController.signUp);
router.post("/signIn", accountController.signIn);
router.get("/getAccountDetail", isAuth, accountController.getAccountDetail);
router.post(
  "/updateAccountDetail",
  isAuth,
  accountController.updateAccountDetail
);
router.post(
  "/updateAccountPassword",
  isAuth,
  accountController.updateAccountPassword
);
router.get("/getCart", isAuth, accountController.getCart);
router.post("/addToCart/:id", isAuth, accountController.addToCart);
router.delete("/removeFromCart/:id", isAuth, accountController.removeFromCart);

module.exports = router;
