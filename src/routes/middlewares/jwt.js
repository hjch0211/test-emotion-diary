const jwt = require("jsonwebtoken"); // 근데 이거 말고 다른 jwt라이브러리도 많은 듯

exports.verifyToken = (req, res, next) => {
  try {
    // 토큰 검증
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.",
      });
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다.",
    });
  }
};
