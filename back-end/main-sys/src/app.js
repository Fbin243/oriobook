const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/index.route");
const methodOverride = require("method-override");
const cors = require("cors");
const app = express();

// Cấu hình middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(cors());

// ROUTES INIT
route(app);

module.exports = app;
