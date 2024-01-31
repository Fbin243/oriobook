const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/payment.route");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const app = express();

// Cấu hình middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

// ROUTES INIT
route(app);
// const opts = {
//   key: fs.readFileSync("src/cert/key.pem", { encoding: "utf-8" }),
//   cert: fs.readFileSync("src/cert/cert.pem", { encoding: "utf-8" }),
// };
// const server = https.createServer(opts, app);

module.exports = app;
