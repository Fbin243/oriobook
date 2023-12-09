const express = require("express");
const authorController = require("../controllers/author.controller");
const router = express.Router(); 
console.log("ruun");
router.get("/detail/:id", authorController.getDetail);
router.get("/list", authorController.getAuthorList);

// Implement các hàm backend ở đây

module.exports = router;
