require("dotenv").config();
const { ImgurClient } = require("imgur");
// const client = new ImgurClient({
//   clientId: "0d2876cf7258ff6",
//   clientSecret: "b56e297f21b066c4cd1153a7b575e6c3e36755db",
// });

const client = new ImgurClient({
  username: process.env.IMGUR_UN,
  password: process.env.IMGUR_PW,
  clientId: process.env.IMGUR_CLIENT_ID,
});

module.exports = { client };
