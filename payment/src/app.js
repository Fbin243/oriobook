const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/payment.route");
const cors = require("cors");
const app = express();

// Cấu hình middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// ROUTES INIT
route(app);

module.exports = app;
