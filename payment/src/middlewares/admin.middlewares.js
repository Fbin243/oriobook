const userModle = require("../controllers/account.controller");

const authMethod = require("../methods/auth.methods");

exports.isAdmin = async (req, res, next) => {
  // Lấy access token từ header
  const accessTokenFromHeader = req.headers.authorization;
  if (!accessTokenFromHeader) {
    return res.status(401).send("Không tìm thấy access token!");
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  const verified = await authMethod.verifyToken(
    accessTokenFromHeader,
    accessTokenSecret
  );

  console.log(verified.payload.isAdmin);

  if (!verified.payload.isAdmin) {
    console.log("Not Admin");
    return res
      .status(401)
      .send("Bạn không có quyền truy cập vào tính năng này!");
  }
  const { payload } = verified;

  req.headers = { ...req.headers, ...payload };

  return next();
};
