const express = require("express");
const userOrm = require("../service/orm");
const router = express.Router();
const HttpError = require("../util/httpError");

const ERROR_BAD_REQUEST = new HttpError(400, "요청 형식이 올바르지 않습니다.");
const ERROR_DUPLICATE_EMAIL = new HttpError(400, "이메일이 중복되었습니다.");

router
  // 로그인일 경우
  .post("/signin", (req, res) => {})
  // 회원가입의 경우
  .post("/signup", async (req, res, next) => {
    const { email = null, name = null } = req.body;
    if (!email || !name) next(ERROR_BAD_REQUEST);
    const isUnique = !(await userOrm.readUserData(email));
    if (!isUnique) next(ERROR_DUPLICATE_EMAIL);

    // db에 사용자 정보 추가하고
    // response하는 작업하기
  })
  // 회원 삭제의 경우
  .delete("/withdrawal", (req, res) => {});

module.exports = router;

// [Todo]
// body : {
//   data : {},
//   meta : {status : ,message : string}
// }
