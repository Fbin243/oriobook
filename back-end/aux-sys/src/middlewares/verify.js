const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  // Lấy payment token trong header ra và check
  const paymentToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  // console.log("TOKEN Nhận được: ", paymentToken);

  if (paymentToken) {
    jwt.verify(paymentToken, process.env.ACCESS_TOKEN_SECRET, (err, email) => {
      // Nếu token không hợp lệ thì trả về kq
      if (err) {
        return res.json({ result: "fail", msg: `Token is not valid` });
      }
      // Nếu token hợp lệ thì cho đi tiếp
      req.user = email;
      next();
    });
  } else {
    // res.status(401).json("You're not authenticated");
    res.json({ result: "fail", msg: `Token doesn't exist` });
  }
};

module.exports = {
  verifyToken,
};
