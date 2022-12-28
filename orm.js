// [Temp] orm 네이밍 임시
const { PrismaClient } = require("@prisma/client");
const prisma = PrismaClient();
// [Temp] 구조도 임시 -> ormUser과 ormScore 이런 식으로 나눌까
export const orm = {
  /**
   * @param {{
   *    email : string;
   *    name : string;
   *    scores : { content : string; point : number }
   * }} payload
   */
  createUser: async (payload) => {
    const { email, name, scores } = payload;
    await prisma.user.create({
      data: { email, name, scores: { create: scores } },
    });
  },

  // [Todo] 나중에 id는 제외하고 리턴하게 만들어 보기
  findAllUser: async () => await prisma.user.findMany({ select: { id: false } }),

  /**
   * @param {string} email
   * @returns user record
   */
  findUser: async (email) => await prisma.user.findUnique({ where: { email } }),

  // 스코어 삭제 추가
  // 유저 삭제 추가
  // 스코어 추가 추가
  // 유저의 스코어 조회 추가

  // 모델 구조 자체를 바꿔야할 듯 -> point가 배열 형태여야 함 -> 이름도 바꿔야 할듯
};
