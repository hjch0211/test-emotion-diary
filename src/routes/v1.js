const express = require("express");
const jwt = require("jsonwebtoken");
const userOrm = require('../service/orm')

const { verifyToken } = require("./middlewares/jwt");

const router = express.Router();

router.post("/token", async (req, res) => {
  const { clientSecret } = re.body; // ?
  try{
    // 토큰 조회 orm 필요
  }
});
