export {}
const JWT = require("jsonwebtoken");

const verifyAccessToken = async (ctx, next) => {
  try {
    const secret: any = process.env.ACCESS_TOKEN_SECRET;
    const authHeader = ctx.request.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
     await JWT.verify(token, secret, async (err: any, user: any) => {
        if (err) {
          ctx.throw(403, "Token is not valid!");
        }
        ctx.request.body.user = user;
        
      });
      return next()
    }
    else {
  
      ctx.throw(200, "You are not authenticated!");
      
    }
  }

  catch(err){
    console.log("Error" , err)
    throw new Error("Error verifying token");
    
  }
};

module.exports = {verifyAccessToken}