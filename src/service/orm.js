const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// [Temp] 구조도 임시
// [Todo] 예외 처리 해주기
// [Todo] return 값이 지멋대로 이긴 함
module.exports = userORM = {
  /**
   * @param {{
   *    email : string;
   *    name : string;
   * }} payload
   */
  createUser: async (payload) => {
    const { email, name = "" } = payload;
    await prisma.user.create({
      data: { email, name },
    });
  },

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
   * @param {string} email
   * @returns user's refresh token
   */
  readUserRefreshToken: async (email) =>
    await prisma.user.findUnique({ where: { email }, select: { refreshToken: true } }),

  /**
   * @param {{
   *    email : string;
   *    refreshToken : string;
   * }} payload
   */
  updateUserRefreshToken: async (payload) => {
    const { email, refreshToken } = payload;
    await prisma.user.update({
      where: { email },
      data: { refreshToken },
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

  /**
   * @param {{
   *    email : string;
   *    scoreId : number;
   * }} payload
   */
  deleteUserScore: async (payload) => {
    const { email, scoreId } = payload;

    const [{ scores }] = await prisma.user.findMany({
      where: { email },
      select: {
        scores: {
          where: { id: scoreId },
        },
      },
    });
    scores.length !== 0 &&
      (await prisma.score.delete({
        where: { id: scores[0].id },
      }));
  },
};
