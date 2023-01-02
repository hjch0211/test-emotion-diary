const userORM = require("./service/orm");
const { refresh } = require("./service/jwt");
// [Todo] TS로 옮기다가 실패하고 다시 JS로 작업중. 일단 JS로 배워놓자
// [Todo] module 방식으로 바꾸기

const testUser = { email: "eeeee@tset.com", name: "niknknknkn" };
const testScore = { comment: "hihihi", point: 10000 };

const main = async () => {
  // await userORM.createUser(testUser);
  // await userORM.createUserScore({ email: testUser.email, scores: testScore });
  const test = await userORM.readUserScores(testUser.email);
  const token = await userORM.readUserRefreshToken(testUser.email);
  const refreshToken = await refresh();
  await userORM.updateUserRefreshToken({ email: testUser.email, refreshToken });
  // const scoreId = test[0].scores[0].id;
  console.log(token);
  // console.log(await userORM.deleteUserScore({ email: testUser.email, scoreId }));
};

// 에러 처리 라우터와 어떻게 결합하면 좋을까?
main();
// .then(async () => {
//   // 스크립트가 끝난 후에는 연결을 끊어주어야 함
//   await prisma.$disconnect();
// })
// .catch(async (e) => {
//   console.log(e);
//   await prisma.$disconnect();
// });
