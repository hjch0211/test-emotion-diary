const jwt = require("jsonwebtoken");
const userOrm = require("./orm");
const JWT_SECRET = process.env.JWT_SECRET;

AT_EXPIRES_IN = "1h";
RT_EXPIRES_IN = "14d";
ALGORITHM = "HS256";

module.exports = {
  issueAcsTkn: (userEmail) => {
    // access token 발급
    const payload = { email: userEmail };
    // secret으로 sign하여 발급하고 return
    return jwt.sign(payload, JWT_SECRET, {
      algorithm: ALGORITHM, // 암호화 알고리즘
      expiresIn: AT_EXPIRES_IN, // 유효기간
    });
  },
  verifyAcsTkn: (token) => {
    // access token 검증
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return {
        ok: true,
        email: decoded.email,
      };
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },
  issueRfrTkn: () => {
    // refresh token 발급
    return jwt.sign({}, JWT_SECRET, {
      // refresh token은 payload 없이 발급 -> 왜일까
      algorithm: ALGORITHM,
      expiresIn: RT_EXPIRES_IN,
    });
  },
  verifyRfrTkn: async (token, userEmail) => {
    // refresh token 검증
    try {
      const { refreshToken } = await userOrm.readUserRefreshToken(userEmail); // refresh token 가져오기
      if (token === refreshToken) {
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
