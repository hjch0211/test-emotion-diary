const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  sign: (user) => {
    // access token 발급
    const payload = {
      id: user.id,
      role: user.role,
    };

    // secret으로 sign하여 발급하고 return
    return jwt.sign(payload, secret, {
      algorithm: "HS256", // 암호화 알고리즘
      expiresIn: "1h", // 유효기간
    });
  },
  verify: (token) => {
    // access token 검증
    let decoded = null;
    try {
      decoded = jwt.verify(token, secret);
      return {
        ok: true,
        id: decoded.id,
        role: decoded.role,
      };
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },
  refresh: () => {
    // refresh token 발급
    return jwt.sign({}, secret, {
      // refresh token은 payload 없이 발급 -> 왜일까
      algorithm: "HS256",
      expiresIn: "14d",
    });
  },
  refreshVerify: async (token, userId) => {
    // refresh token 검증
    try {
      const data = await ss; // refresh token 가져오기
      if (token === data) {
        try {
          jwt.verify(token, secret);
          return true;
        } catch (err) {
          return false;
        }
      } else return false;
    } catch (err) {
      return false;
    }
  },
};
