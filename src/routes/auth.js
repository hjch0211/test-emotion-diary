const express = require("express");
const userOrm = require("../service/orm");
const router = express.Router();
const HttpError = require("../util/httpError");
const MetaData = require("../util/metaData");
const ResponseData = require("../util/ResponseData");
const jwt = require("../service/jwt");
const parseToken = require("../util/parseToken");

const ERROR_BAD_REQUEST = new HttpError(400, "요청 형식이 올바르지 않습니다.");
const ERROR_DUPLICATE_EMAIL = new HttpError(400, "이메일이 중복되었습니다.");
const ERROR_INVALID_USERDATA = new HttpError(400, "유저 정보가 없습니다.");
const ERROR_INVALID_TOKEN = new HttpError(400, "토큰이 유효하지 않습니다.");

router
  /**
   * POST signin
   * @reqBody email, name
   * @return email, name, accessToken, refreshToken
   */
  .post("/signin", async (req, res, next) => {
    const { email = null, name = null } = req.body;
    if (!email || !name) return next(ERROR_BAD_REQUEST);

    const isInvalid = !(await userOrm.readUserData(email));
    if (isInvalid) return next(ERROR_INVALID_USERDATA);

    const accessToken = jwt.issueAcsTkn(email);
    const refreshToken = jwt.issueRfrTkn();
    return res.status(200).json(new ResponseData({ email, name, accessToken, refreshToken }));
  })
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
  /**
   * DELETE withdrawal
   * @reqBody email, name, accessToken, refreshToken
   * @return
   */
  .delete("/withdrawal", async (req, res, next) => {
    const { email = null, name = null } = req.body;
    const accessToken = req.headers.authorization;
    if (!email || !name || !accessToken) return next(ERROR_BAD_REQUEST);
    if (!(await userOrm.readUserData(email))) return next(ERROR_INVALID_USERDATA);

    const parsedAcsTkn = !!accessToken && parseToken(accessToken);
    const resAcsTkn = jwt.verifyAcsTkn(parsedAcsTkn);
    if (!resAcsTkn.ok) return next(ERROR_INVALID_TOKEN);
    if (resAcsTkn.email !== email) return next(ERROR_INVALID_TOKEN);

    await userOrm.deleteUser(email);

    return res
      .status(200)
      .json(new ResponseData({ message: `${email} 유저 정보가 삭제되었습니다.` }));
  });

module.exports = router;
