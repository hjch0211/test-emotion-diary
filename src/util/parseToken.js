/**
 * @property {string} token
 * @returns pure string token
 */
module.exports = parseToken = (token) => {
  const [barear, pureToken] = token.split(" ");
  if (barear === "Barear") return pureToken;
  else throw new Error("토큰 형식이 올바르지 않습니다.");
};
