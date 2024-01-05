const express = require("express");
const categoryController = require("../controllers/category.controller");
const adminMiddleware = require("../middlewares/admin.middlewares");
const router = express.Router();
const isAdmin = adminMiddleware.isAdmin;

// **************** ADMIN **********************
router.get("/manage", isAdmin, categoryController.getManageCategory);
router.get("/edit/:id", isAdmin, categoryController.getEditCategory);
router.post("/edit/save", isAdmin, categoryController.addCategory);
router.post("/edit/save/:id", isAdmin, categoryController.updateCategory);
router.delete("/delete/:id", isAdmin, categoryController.deleteCategory);

module.exports = router;
