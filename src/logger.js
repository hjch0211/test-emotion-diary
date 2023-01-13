const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  // 로그의 심각도를 나타냄. info의 경우 info와 함께, warn, error 단계도 같이 제공
  // error > warn > info > verbose > debug > silly
  level: "info",
  // 로그 형식. json이 기본이며 다양한 형식을 가짐
  // 로그 시간을 기록하고 싶다면, timestamp
  format: format.json(),
  // 로그 저장 방식. File은 파일로 저장, Console은 콘솔로 저장
  transports: [
    new transports.File({ filename: "./src/logs/combined.log" }),
    new transports.File({ filename: "./src/logs/error.log", level: "error" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console({ format: format.simple() }));
}

module.exports = logger;
