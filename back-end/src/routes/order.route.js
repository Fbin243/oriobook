const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();

// Implement các hàm backend ở đây
router.get("/pending", orderController.getPendingOrder);

module.exports = router;
