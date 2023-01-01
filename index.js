const userORM = require("./service/orm");
// [Todo] TS로 옮기다가 실패하고 다시 JS로 작업중. 일단 JS로 배워놓자
const main = async () => {};

// 에러 처리 라우터와 어떻게 결합하면 좋을까?
main()
  .then(async () => {
    // 스크립트가 끝난 후에는 연결을 끊어주어야 함
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
