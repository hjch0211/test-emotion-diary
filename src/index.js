// [Todo] 애네 합쳐주고 싶네
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();
const indexRouter = require("./routes");

const app = express();
app.set("port", process.env.PORT || 4000);

app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use("/", indexRouter);

// 없는 라우터로 접근 시
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  // 왜 locals?
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")} 에서 대기중`);
});

// 에러 처리 라우터와 어떻게 결합하면 좋을까?
// main();
// .then(async () => {
//   // 스크립트가 끝난 후에는 연결을 끊어주어야 함
//   await prisma.$disconnect();
// })
// .catch(async (e) => {
//   console.log(e);
//   await prisma.$disconnect();
// });
