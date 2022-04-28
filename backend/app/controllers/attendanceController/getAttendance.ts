export {}
const {GoogleSpreadsheet} = require("google-spreadsheet")

require("dotenv").config();

const SPREADSHEET_ID = process.env.GOOGLE_SPREAD_SHEET_ID;
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/gm, "\n");

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const getAttendance = async (ctx, next) => {
  try {
    if (ctx.request.body.username === ctx.request.body.user.email) {
      async function getUser() {
        await doc.useServiceAccountAuth({
          client_email: CLIENT_EMAIL,
          private_key: PRIVATE_KEY,
        });
        await doc.loadInfo();

        const sheet = doc.sheetsById[SHEET_ID];
        const rows = await sheet.getRows();
        return rows
          .filter((arr) => arr.username === ctx.request.body.user.email)
          .map((arr) => {
            return {
              username: arr.username,
              status: arr.status,
              date: arr.date,
            };
          });
      }

      async function get(ctx, next) {
        let user = await getUser();
        ctx.body = user;
      }

      await get(ctx, next);
    }
  } catch (err) {
    console.log("error", err);
  }
};

module.exports = {
  getAttendance,
};
