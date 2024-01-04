const express = require("express");
const authorController = require("../controllers/author.controller");
const router = express.Router();

router.get("/detail/:id", authorController.getDetail);
router.get("/list", authorController.getAuthorList);
router.get("/getAuthorListTopRated", authorController.getAuthorListTopRated);

module.exports = router;