const express = require("express");
const authRouter = require("./auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hellosss");
});

router.use("/auth", authRouter);

module.exports = router;
