const express = require("express");
const router = express.Router();

router
  // 로그인일 경우
  .post("/signin", (req, res) => {})
  // 회원가입의 경우
  .post("/signup", (req, res) => {})
  // 회원 삭제의 경우
  .delete("/withdrawal", (req, res) => {});

module.exports = router;
