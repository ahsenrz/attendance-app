const Router = require('koa-router')

const {createAttendance} = require("../controllers/attendanceController/createAttendance");
const {getAttendance} = require('../controllers/attendanceController/getAttendance');
const {login} = require('../controllers/loginController/login')
const {verifyAccessToken} = require('../jwt_helpers/verifyAccessToken')

const router = new Router()

router.post(process.env.LOGIN_ROUTE , login );

router.post(process.env.GET_ATTENDANCE_ROUTE , verifyAccessToken , getAttendance);

router.post(process.env.CREATE_ATTENDANCE_ROUTE , verifyAccessToken , createAttendance);

export{}
module.exports = { router } 