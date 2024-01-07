const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const paymentToken = req.body.paymentToken

  if (paymentToken) {
    jwt.verify(paymentToken, process.env.ACCESS_TOKEN_SECRET, (err, userEx) => {
      if (err) {
        return res.json({ result: "fail", msg: `Token is not valid` });
      }

      req.user = userEx;

      next();
    });
  } else {
    // res.status(401).json("You're not authenticated");
    res.json({result: 'fail', msg: `Token doesn't exist`})
  }
};

module.exports = {
  verifyToken,
};