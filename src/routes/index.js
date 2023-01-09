const express = require("express");
const ResponseBody = require("../util/metaData");
const authRouter = require("./auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hellosss");

  new ResponseBody(data, "asdfasdf");
  // [Todo] data, metaData를 위한 클래스 만들기
  res.send({
    data: "asdfsadf",
    metaData: new metaData("asdf"),
  });
});

router.use("/auth", authRouter);

module.exports = router;
