const userOrm = require("./orm");

const userData = {
  email: "test@email.com",
  name: "jchan",
  scores: { emotion: "hohoho", point: 10 },
};

const main = async () => {
  await userOrm.createUser(userData);
  console.log(await userOrm.findAllUser());
};

main();
// 에러 처리 라우터와 어떻게 결합하면 좋을까?
// main()
//   .then(async () => {
//     // 스크립트가 끝난 후에는 연결을 끊어주어야 함
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.log(e);
//     await prisma.$disconnect();
//   });
