const express = require("express");
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const adminMiddleware = require("../middlewares/admin.middlewares");
const router = express.Router();

const isAuth = authMiddleware.isAuth;
const isAdmin = adminMiddleware.isAdmin;

// **************** USER **********************
router.get("/pending", isAuth, orderController.getMyOrders);
router.get("/successful", isAuth, orderController.getMyOrders);
router.get("/cancelled", isAuth, orderController.getMyOrders);
router.post("/place", isAuth, orderController.placeOrder);

// **************** ADMIN **********************
router.get("/manage-order", isAdmin, orderController.getManageOrders);
router.post("/handle-manage-order/:id", isAdmin, orderController.hanldeManageOrders);

module.exports = router;
