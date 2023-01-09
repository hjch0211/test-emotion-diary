/**
 * @property {string} token
 * @returns pure string token
 */
module.exports = parseToken = (token) => {
  const [bearer, pureToken] = token.split(" ");
  if (bearer === "Bearer") return pureToken;
  else return null;
};
