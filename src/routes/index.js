const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hellosss");
});

router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;
