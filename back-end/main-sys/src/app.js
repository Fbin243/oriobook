const express = require("express");
const { passport } = require("./auth");
const session = require("cookie-session");
const bodyParser = require("body-parser");
const route = require("./routes/index.route");
const methodOverride = require("method-override");
const { OAuth2Client } = require("google-auth-library");
const account = require("./models/account.model");
const authMethod = require("./methods/auth.methods");

const cors = require("cors");
const https = require("https");
const fs = require("fs");
const app = express();

const axios = require("axios");
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const instance = axios.create({
  httpsAgent: httpsAgent,
});

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    coockie: { secure: false },
  })
);

app.use(passport.initialize());

// Cấu hình middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  })
);

app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

const getOath2Client = () => {
  const oauth2 = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://localhost:3000/auth/google/callback"
  );
  return oauth2;
};

app.get("/auth/google/callback", async (req, res, next) => {
  const { code = null } = req.query;
  if (!code) {
    return res.redirect("https://localhost:8080/login");
  }
  try {
    const client = getOath2Client();
    const result = await client.getToken(code);
    const accessToken = result.tokens.access_token;

    const information = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
      {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => res.json());
    console.log(information);

    // Kiem tra xem email da duoc dung de tao tai khoan hay chua
    const oldAcc = await account.findOne({ email: information.email });
    let newAcc = new account();
    if (oldAcc == null) {
      // Tao tai khoan
      newAcc.email = information.email;
      newAcc.firstName = information.given_name;
      newAcc.lastName = information.family_name;
      
      // Khi đăng kí tk bên ht chính thì gửi request để tạo tk bên ht phụ kèm xin token
      let dataSend = {
        email: newAcc.email,
      };

      console.log('new acc', newAcc);

      const response = await instance.post(
        `${process.env.AUX_URL}/add-acc?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
        dataSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let data = response.data;
      let result2 = data.result;

      if (result2 !== "success") {
        return next(data.msg);
      }

      let paymentToken = data.paymentToken;

      newAcc.token = paymentToken;

      await newAcc.save();
      // await newAcc.save();
    } else {
      newAcc = oldAcc;

      let dataSend = {
        email: newAcc.email,
      };

      // Khi đăng nhập tài khoản thì xin lại bên ht phụ một token mới
      const response = await instance.post(
        `${process.env.AUX_URL}/generate-token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
        dataSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let data = response.data;
      let resultStatus = data.result;

      if (resultStatus !== "success") {
        return next(data.msg);
      }

      let paymentToken = data.paymentToken;

      oldAcc.token = paymentToken;
      await oldAcc.save();
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const dataForAccessToken = {
      email: newAcc.email,
      isAdmin: false,
    };

    const access_token = await authMethod.generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife
    );

    // if(oldAcc === null){
    // }else{
    //   oldAcc.token = paymentToken;
    //   await oldAcc.save();
    // }

    return res.redirect(`https://localhost:8080/access?token=${access_token}`);
  } catch (err) {
    console.log(err);
    // return res.redirect("https://localhost:8080/login");
  }
});

// ROUTES INIT
route(app);
// const opts = {
//   key: fs.readFileSync("src/cert/key.pem", { encoding: "utf-8" }),
//   cert: fs.readFileSync("src/cert/cert.pem", { encoding: "utf-8" }),
// };
// const server = https.createServer(opts, app);

module.exports = app;
