const express = require("express");
const authorController = require("../controllers/author.controller");
const adminMiddleware = require("../middlewares/admin.middlewares");
const router = express.Router();
const isAdmin = adminMiddleware.isAdmin;

router.get("/detail/:id", authorController.getDetail);
router.get("/list", authorController.getAuthorList);
router.get("/getAuthorListTopRated", authorController.getAuthorListTopRated);

// **************** ADMIN **********************
router.get("/manage", isAdmin, authorController.getManageAuthor);
router.get("/edit/:id", isAdmin, authorController.getEditAuthor);
router.post("/edit/save", isAdmin, authorController.addAuthor);
router.post("/edit/save/:id", isAdmin, authorController.updateAuthor);
router.delete("/delete/:id", isAdmin, authorController.deleteAuthor);

module.exports = router;
