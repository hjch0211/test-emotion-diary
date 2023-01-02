const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// [Temp] 구조도 임시
// [Todo] 예외 처리 해주기
module.exports = userORM = {
  /**
   * @param {{
   *    email : string;
   *    name : string;
   *    scores ?: { comment : string; point : number }
   * }} payload
   */
  createUser: async (payload) => {
    const { email, name = "", scores } = payload;
    await prisma.user.create({
      data: { email, name, scores: { create: scores && { ...scores } } },
    });
  },

  /**
   * @param {string} email
   * [!] 더 깔끔하게 쓸 수 있는 방법은 없을까
   */
  deleteUser: async (email) => {
    // score 먼저 삭제 해주어야 삭제가 정상적으로 됨
    const [res] = await prisma.user.findMany({
      where: { email },
      select: { scores: true },
    });

    res &&
      res.scores.forEach(async (score) => {
        await prisma.score.delete({
          where: { id: score.id },
        });
      });

    await prisma.user.delete({
      where: { email },
    });
  },

  readAllUser: async () => await prisma.user.findMany({ select: { email: true, name: true } }),

  /**
   * @param {string} email
   * @returns user's score tables
   */
  readUserScores: async (email) =>
    await prisma.user.findMany({ where: { email }, select: { scores: true } }),

  /**
   * @param {string} email
   * @returns user's record
   */
  readUserData: async (email) =>
    await prisma.user.findUnique({ where: { email }, include: { scores: true } }),

  /**
   * @param {{
   *    email : string;
   *    scores : { comment : string; point : number }
   * }} payload
   */
  createUserScore: async (payload) => {
    const { email, scores } = payload;
    await prisma.user.update({
      where: { email },
      data: {
        scores: { create: { ...scores } },
      },
    });
  },

  /**
   * @param {*} payload
   * @deprecated [!] score 테이블의 어떤 키를 참고하면 좋을까
   */
  deleteUserScore: async (payload) => {},

  // 스코어 삭제 추가
};
