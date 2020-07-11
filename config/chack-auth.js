// 1
const jwt = require("jsonwebtoken");

// 2
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // token을 담는곳
    const decoded = jwt.verify(token, "secret"); // token 검증
    req.userData = decoded;
    next();
  } catch (err) {
    return res.json({
      message: "Auth failed",
    });
  }
};
