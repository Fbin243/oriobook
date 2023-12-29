const express = require("express");
const accountController = require("../controllers/account.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const router = express.Router();

const isAuth = authMiddleware.isAuth;

// Implement các hàm backend ở đây
router.get("/", accountController.getHome);

module.exports = router;
