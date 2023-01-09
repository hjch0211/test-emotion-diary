const RateLimit = require("express-rate-limit");
const ERROR = require("../../util/errorCode");

const apiLimiter = new RateLimit({
  windowMs: 60 * 1000, // 1분
  max: 1,
  delayMs: 0,
  handler(req, res, next) {
    next(ERROR.EXCEEDED_REQUEST);
  },
});

const deprecated = (req, res, next) => {
  next(ERROR.DEPRECATED);
};

module.exports = { apiLimiter, deprecated };
