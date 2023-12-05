const productRouter = require("./product.route");
const accountRouter = require("./account.route");
const orderRouter = require("./order.route");

function route(app) {
  // Định nghĩa các route theo tài nguyên
  app.use("/account", accountRouter);
  app.use("/product", productRouter);
  app.use("/order", orderRouter);

  // Hai middlewares này phải để cuối để check lỗi
  app.use((req, res, next) => {
    res.status(404).json({
      statusCode: 404,
      message: "File Not Found",
    });
  });
  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  });
}

module.exports = route;
