const jwt = require("jsonwebtoken");
const userTokenSecret = process.env.USER_TOKEN_SECRET;

const tokenGeneration = async (payload, time) => {
  const token = jwt.sign(payload, userTokenSecret, { expiresIn: time });
  return token;
}

module.exports = {
  tokenGeneration
}
