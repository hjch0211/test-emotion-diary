const express = require("express");
const parseToken = require("../util/parseToken");
const router = express.Router();
const ResponseData = require("../util/ResponseData");
const ERROR = require("../util/errorCode");
const userOrm = require("../service/orm");
const jwt = require("../service/jwt");

router
  /**
   * GET user all data
   * @reqHeader accessToken
   * @return user all data
   */
  .get("/", async (req, res, next) => {
    const { email } = req.query;
    const acsTkn = parseToken(req.headers.authorization);
    if (acsTkn === null || !email) return next(ERROR.BAD_REQUEST);

    const resAcsTkn = jwt.verifyAcsTkn(acsTkn);
    if (!resAcsTkn.ok) return next(ERROR.INVALID_TOKEN);
    if (resAcsTkn.email !== email) return next(ERROR.INVALID_TOKEN);

    const userData = await userOrm.readUserData(email);
    if (!userData) return next(ERROR.INVALID_USER);

    return res.status(200).json(new ResponseData(userData));
  });

module.exports = router;
