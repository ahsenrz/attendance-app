export {}

const JWT = require("jsonwebtoken")

type User = {
  id : string,
  email : string
}

var generateAccessToken = async (user:User , next) => {
  const secret:any = process.env.ACCESS_TOKEN_SECRET
   return JWT.sign({ id: user.id, email: user.email }, secret);
  };

module.exports = {generateAccessToken}