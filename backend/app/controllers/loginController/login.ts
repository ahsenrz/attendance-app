export {}
const { generateAccessToken } = require('../../jwt_helpers/generateAccessToken')

const login = async (ctx, next) => {
  const user = ctx.request.body
  console.log("User Logged in")
  try {
    if (user) {

      const accessToken = await generateAccessToken(user)
      return (ctx.response.body = {
        accessToken,
      })
    }
    await next()
  } catch (error) {
    console.error(error)

    // return error
    ctx.body = 'Error'
  }
}

module.exports = {
  login,
}
