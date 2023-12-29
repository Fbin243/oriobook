const accountRouter = require("./account.route");

function route(app) {
  // Định nghĩa các route theo tài nguyên
  app.use("/", accountRouter);

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
