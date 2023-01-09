const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const cors = require("cors");

const router = express.Router();

router.use(
  cors({
    // origin : 'http://localhost:asdasdadas',
    credentials: true,
  })
);

router.get("/", (req, res) => {
  res.send("Hellosss");
});

router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;
