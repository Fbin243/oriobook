const express = require("express");
const accountController = require("../controllers/account.controller");
const router = express.Router();

// Implement các hàm backend ở đây
router.post("/signUp", accountController.signUp);
router.post("/signIn", accountController.signIn);
router.get("/getAccountDetail", accountController.getAccountDetail);
router.post("/updateAccountDetail", accountController.updateAccountDetail);
router.post("/updateAccountPassword", accountController.updateAccountPassword);
router.get("/getCart", accountController.getCart);
router.post("/addToCart/:id", accountController.addToCart);
router.delete("/removeFromCart/:id", accountController.removeFromCart);

module.exports = router;
