const { PrismaClient } = require("@prisma/client");
const { json } = require("express");

const prisma = new PrismaClient();

// 데이터 베이스에 쿼리를 보내는 함수
const main = async () => {
  //   await prisma.user.create({
  //     data: {
  //       email: "test@email.com",
  //       name: "Jchan",
  //       scores: { create: { content: "hohohohos", point: 10 } },
  //     },
  //   });

  const allUsers = await prisma.user.findMany({
    // 옵션 설정. 다른 테이블 정보는 옵션 설정 안해주면 안불러오네?
    include: {
      scores: true,
    },
  });

  console.log(allUsers);
};

main()
  .then(async () => {
    // 스크립트가 끝난 후에는 연결을 끊어주어야 함
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
