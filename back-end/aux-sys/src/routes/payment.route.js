const paymentRouter = require("./payment.route");
const paymentController = require("../controllers/payment.controller");

function route(app) {
  app.post("/add-acc", paymentController.addAcc)
  app.post("/check-balance", paymentController.checkBalance)
  app.post("/get-balance", paymentController.getBalance)

  app.use("/", (req, res, next) => {
    try {
      res.send("Ok");
    } catch (error) {
      next(error);
    }
  });

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
