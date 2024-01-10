const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const paymentToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  console.log("TOKEN Nhận được: ", paymentToken);

  console.log(req.body);

  if (paymentToken) {
    jwt.verify(
      paymentToken,
      process.env.ACCESS_TOKEN_SECRET,
      (err, infoMain) => {
        if (err) {
          return res.json({ result: "fail", msg: `Token is not valid` });
        }

        console.log(infoMain);

        next();
      }
    );
  } else {
    // res.status(401).json("You're not authenticated");
    res.json({ result: "fail", msg: `Token doesn't exist` });
  }
};

module.exports = {
  verifyToken,
};
