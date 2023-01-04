const express = require("express");
const userOrm = require("../service/orm");
const router = express.Router();

router
  // 로그인일 경우
  .post("/signin", (req, res) => {})
  // 회원가입의 경우
  .post("/signup", async (req, res) => {
    const { email = null, name = null } = req.body;
    // // email이나 name이 null인 경우
    if (!email || !name) throw { code: 400, message: "요청 형식이 올바르지 않습니다." };
    // // email이 겹치는 경우
    const isUnique = !(await userOrm.readUserData(email));
    if (!isUnique)
      throw {
        code: 401,
        message: "중복되는 email입니다.",
      };
  })
  // 회원 삭제의 경우
  .delete("/withdrawal", (req, res) => {});

module.exports = router;
