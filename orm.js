const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// [Temp] 구조도 임시 -> ormUser과 ormScore 이런 식으로 나눌까
module.exports = userOrm = {
  /**
   * @param {{
   *    email : string;
   *    name : string;
   *    scores : { emotion : string; point : number }
   * }} payload
   */
  createUser: async (payload) => {
    const { email, name = "", scores } = payload;
    await prisma.user.create({
      data: { email, name, scores: { create: scores } },
    });
  },

  /**
   * @param {string} email
   */
  deleteUser: async (email) => {
    await prisma.user.delete({
      where: { email },
    });
  },

  // [Todo] 나중에 id는 제외하고 리턴하게 만들어 보기
  findAllUser: async () => await prisma.user.findMany(),

  /**
   * @param {string} email
   * @returns user record
   */
  findUser: async (email) => await prisma.user.findUnique({ where: { email } }),

  // 유저의 스코어 조회 추가
  //   findUserScores: async (email) => await findUser,
  // 스코어 삭제 추가
  // 스코어 추가 추가
};
