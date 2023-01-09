const ratelimit = require("express-rate-limit");
const ERROR = require("../../util/errorCode");

const apiLimiter = ratelimit({
  windowMs: 5 * 1000, // 1분
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
