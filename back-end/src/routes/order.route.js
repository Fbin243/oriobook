const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();

// **************** USER **********************
router.get("/pending", orderController.getMyOrders);
router.get("/successful", orderController.getMyOrders);
router.get("/cancelled", orderController.getMyOrders);

// **************** ADMIN **********************
router.get("/manage-order", orderController.getManageOrders);
router.post("/handle-manage-order/:id", orderController.hanldeManageOrders);

module.exports = router;
