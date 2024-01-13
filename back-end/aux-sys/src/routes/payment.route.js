const paymentRouter = require("./payment.route");
const paymentController = require("../controllers/payment.controller");
const middlewares = require("../middlewares/verify");

function route(app) {
  // Có 2 route này để xin token tương ứng với đăng kí và đăng nhập
  app.post("/add-acc", paymentController.addAcc);
  app.post("/generate-token", paymentController.generatePaymentToken);
  // Các route dưới là sử dụng token đã đăng kí nên cần middleware verify
  app.post(
    "/get-balance",
    middlewares.verifyToken,
    paymentController.getBalance
  );
  app.post(
    "/adjust-balance",
    middlewares.verifyToken,
    paymentController.adjustBalance
  );

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
