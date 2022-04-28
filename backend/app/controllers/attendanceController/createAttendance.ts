export {}
const {GoogleSpreadsheet} = require("google-spreadsheet")
require("dotenv").config();

const SPREADSHEET_ID = process.env.GOOGLE_SPREAD_SHEET_ID;
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/gm, "\n");

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const createAttendance = async (ctx, next) => {
  const { username, status, date } = ctx.request.body;
  try {
    if (ctx.request.body.username === ctx.request.body.user.email) {
      console.log("createAttendance");

      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];

      const result = await sheet.addRow({
        username,
        status,
        date,
      });
      
      await next();
    }
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = {
  createAttendance,
};
