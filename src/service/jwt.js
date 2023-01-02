const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

AT_EXPIRES_IN = "1h";
RT_EXPIRES_IN = "14d";
ALGORITHM = "HS256";

module.exports = {
  sign: (user) => {
    // access token 발급
    const payload = {
      id: user.id,
      role: user.role,
    };

    // secret으로 sign하여 발급하고 return
    return jwt.sign(payload, JWT_SECRET, {
      algorithm: ALGORITHM, // 암호화 알고리즘
      expiresIn: AT_EXPIRES_IN, // 유효기간
    });
  },
  verify: (token) => {
    // access token 검증
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
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
    return jwt.sign({}, JWT_SECRET, {
      // refresh token은 payload 없이 발급 -> 왜일까
      algorithm: ALGORITHM,
      expiresIn: RT_EXPIRES_IN,
    });
  },
  refreshVerify: async (token, userId) => {
    // refresh token 검증
    try {
      const data = await ss; // refresh token 가져오기
      if (token === data) {
        try {
          jwt.verify(token, JWT_SECRET);
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
