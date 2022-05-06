const Koa = require('koa')
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const jwtVerify = require('koa-jwt')
const { router } = require('./app/routes/router')
const { verifyAccessToken } = require('./app/jwt_helpers/verifyAccessToken')
require('dotenv').config()

const port = 5000
const app = new Koa()

// CORS POLIDY MIDDLEWARE
app.use(cors())
// JWT MIDDLEWARE
app.use(
  jwtVerify({
    secret: process.env.ACCESS_TOKEN_SECRET,
  }).unless({
    path: [process.env.LOGIN_ROUTE , '/'],
  }),
)
// JSON PRETTIER MIDDLEWARE
app.use(json())
// BODY PARSER MIDDLEWARE
app.use(bodyParser())

app.use(ctx => {
  ctx.body = 'Hello World';
});
//for cors
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  await next()
})

// ROUTE MIDDLEWARE
app.use(router.routes()).use(router.allowedMethods())

app.listen(process.env.PORT || port, () =>
  console.log(`Server started on port ${port}`),
)
