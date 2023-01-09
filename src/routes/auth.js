const express = require("express");
const userOrm = require("../service/orm");
const router = express.Router();
const HttpError = require("../util/httpError");
const MetaData = require("../util/metaData");
const ResponseData = require("../util/ResponseData");
const jwt = require("../service/jwt");

const ERROR_BAD_REQUEST = new HttpError(400, "요청 형식이 올바르지 않습니다.");
const ERROR_DUPLICATE_EMAIL = new HttpError(400, "이메일이 중복되었습니다.");

router
  // 로그인일 경우
  .post("/signin", (req, res) => {})
  /**
   * POST signup
   * @reqBody email, name
   * @return email, name, accessToken, refreshToken
   */
  .post("/signup", async (req, res, next) => {
    const { email = null, name = null } = req.body;
    if (!email || !name) return next(ERROR_BAD_REQUEST);
    const isUnique = !(await userOrm.readUserData(email));
    if (!isUnique) return next(ERROR_DUPLICATE_EMAIL);

    await userOrm.createUser({ email, name });
    const accessToken = jwt.issueAcsTkn(email);
    const refreshToken = jwt.issueRfrTkn();

    return res.status(200).json(new ResponseData({ email, name, accessToken, refreshToken }));
  })
  // 회원 삭제의 경우
  .delete("/withdrawal", (req, res) => {});

module.exports = router;

// [Todo]
// body : {
//   data : {},
//   meta : {status : ,message : string}
// }
