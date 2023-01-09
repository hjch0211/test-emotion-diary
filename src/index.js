// [Todo] 애네 합쳐주고 싶네
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
// 얘가 있어야 req.body 사용 가능
const bodyParser = require("body-parser");
const HttpError = require("./util/httpError");
const exceptError = require("./routes/middlewares/exceptError");

dotenv.config();
const indexRouter = require("./routes");

const app = express();
app.set("port", process.env.PORT || 4000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") app.use(morgan("combined"));
else app.use(morgan("dev"));

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

/**
 * 경로가 없는 라우터 접근 시
 */
app.use((req, res) => {
  throw new HttpError(404, "경로를 찾을 수 없습니다.");
});

/**
 * 에러 처리 라우터
 */
app.use(exceptError);

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
