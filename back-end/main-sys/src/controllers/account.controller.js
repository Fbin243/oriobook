require("dotenv").config();
const account = require("../models/account.model");
const product = require("../models/product.model");
const authMethod = require("../methods/auth.methods");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const axios = require("axios");
const https = require("https");
const jwt = require("jsonwebtoken");
const { mongooseToObject, formatDate } = require("../utils/mongoose");
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const instance = axios.create({
  httpsAgent: httpsAgent,
});

class accountController {
  signUp = async (req, res, next) => {
    try {
      // console.log(req.body);
      // Kiem tra xem email da duoc dung de tao tai khoan hay chua
      const oldAcc = await account.findOne({ email: req.body.email });
      if (oldAcc != null) {
        return res.send({ status: false });
      }

      // Tao tai khoan
      let newAcc = new account();
      newAcc.email = req.body.email;
      newAcc.firstName = req.body.firstname;
      newAcc.lastName = req.body.lastname;
      newAcc.address = req.body.address;
      newAcc.phone = req.body.phone;
      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        if (err) {
          return next(err);
        }
        newAcc.password = hash;

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        const dataForAccessToken = {
          email: newAcc.email,
          isAdmin: false,
        };

        const accessToken = await authMethod.generateToken(
          dataForAccessToken,
          accessTokenSecret,
          accessTokenLife
        );

        let dataSend = {
          email: req.body.email,
        };

        // Khi đăng kí tk bên ht chính thì ht phụ cx khởi tạo tk thanh toán tương ứng
        const response = await instance.post(
          `https://localhost:4000/add-acc`,
          dataSend,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let data = response.data;
        let result = data.result;

        if (result !== "success") {
          return next(data.msg);
        }

        let paymentToken = data.paymentToken;

        newAcc.token = paymentToken;
        // Save new account
        await newAcc.save();

        return res.send({ status: true, accessToken });
      });
    } catch (error) {
      next(error);
    }
  };

  signIn = async (req, res, next) => {
    try {
      console.log(req.body);
      console.log("ĐÃ lên ");
      // Kiem tra xem email da duoc dung de tao tai khoan hay chua
      let Acc = await account.findOne({ email: req.body.email });
      if (Acc == null) {
        return res.send("email error");
      } else {
        bcrypt.compare(
          req.body.password,
          Acc.password,
          async function (err, result) {
            if (err) {
              return next(err);
            }
            if (!result) {
              return res.send("password error");
            }
            const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
            const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

            const dataForAccessToken = {
              email: Acc.email,
              isAdmin: Acc.isAdmin,
            };

            const accessToken = await authMethod.generateToken(
              dataForAccessToken,
              accessTokenSecret,
              accessTokenLife
            );

            // let dataSend = {
            //   email: req.body.email,
            // };

            // const response = await instance.post(
            //   `https://localhost:${process.env.AUX_PORT}/generate-token`,
            //   dataSend,
            //   {
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //   }
            // );

            // let data = response.data;
            // let resultStatus = data.result;

            // if (resultStatus !== "success") {
            //   return next(data.msg);
            // }

            // let paymentToken = data.paymentToken;

            // Acc.token = paymentToken;
            // await Acc.save();

            return res.send({ status: true, accessToken });
          }
        );
      }
    } catch (error) {
      next(error);
    }
  };

  getAccountDetail = async (req, res, next) => {
    try {
      const Acc = await account.findOne({ email: req.headers.email });
      return res.send(Acc);
    } catch (error) {
      next(error);
    }
  };

  updateAccountDetail = async (req, res, next) => {
    try {
      await account.updateOne(
        { email: req.headers.email },
        {
          $set: {
            firstName: req.body.account_first_name,
            lastName: req.body.account_last_name,
            phone: req.body.account_phone,
            address: req.body.account_address,
          },
        }
      );
      return res.send({ status: true });
    } catch (error) {
      next(error);
    }
  };

  updateAccountPassword = async (req, res, next) => {
    try {
      const Acc = await account.findOne({ email: req.headers.email });
      let Pw = "";
      bcrypt.hash(req.body.password_1, saltRounds, async (err, hash) => {
        if (err) {
          return next(err);
        }
        Pw = hash;
        await bcrypt.compare(
          req.body.password_current,
          Acc.password,
          async function (err, result) {
            if (err) {
              return next(err);
            }
            if (!result) {
              return res.send("password error");
            } else {
              console.log("Compera true");
              console.log(Pw);
              await account.updateOne(
                { email: req.headers.email },
                {
                  $set: {
                    password: Pw,
                  },
                }
              );
              return res.send({ status: true });
            }
          }
        );
      });
    } catch (error) {
      next(error);
    }
  };

  getCart = async (req, res, next) => {
    try {
      // console.log(req.headers);
      const Acc = await account.findOne({ email: req.headers.email });
      const promises = Acc.cart.map((_cart) => {
        const { id_product } = _cart;
        return product.findOne({ _id: id_product.toString() });
      });

      const productResult = await Promise.allSettled(promises);

      const standardlizeRes = productResult.reduce((arr, prod) => {
        const { status, value } = prod;
        if (status == "fulfilled" && value) {
          const quantities = Acc.cart.find(
            (_item) => _item.id_product.toString() == value._id.toString()
          ).quantity;

          return [...arr, { ...value._doc, quantities }];
        }
        return arr;
      }, []);

      return res.send(standardlizeRes);
    } catch (error) {
      next(error);
    }
  };

  addToCart = async (req, res, next) => {
    console.log(req.params.id);
    const Acc = await account.findOne({ email: req.headers.email });
    let newcart = Acc.cart;
    const pro = await newcart.find((obj) =>
      obj.id_product.toString().includes(req.params.id)
    );
    if (pro) {
      console.log(pro);
      const updatequantitycart = newcart.reduce((arr, obj) => {
        if (obj.id_product.toString() == pro.id_product.toString()) {
          return [...arr, { ...obj._doc, quantity: pro.quantity + 1 }];
        }
        return [...arr, obj._doc];
      }, []);
      console.log(updatequantitycart);
      newcart = updatequantitycart;
    } else {
      newcart.push({
        id_product: req.params.id,
        quantity: 1,
      });
    }

    try {
      await account.updateOne(
        { email: req.headers.email },
        {
          $set: {
            cart: newcart,
          },
        }
      );
      return res.send({ status: true });
    } catch (error) {
      next(error);
    }
  };

  minusToCart = async (req, res, next) => {
    console.log(req.params.id);
    const Acc = await account.findOne({ email: req.headers.email });
    let newcart = Acc.cart;
    const pro = await newcart.find((obj) =>
      obj.id_product.toString().includes(req.params.id)
    );

    console.log(pro);
    if (pro.quantity - 1 != 0) {
      const updatequantitycart = newcart.reduce((arr, obj) => {
        if (obj.id_product.toString() == pro.id_product.toString()) {
          return [...arr, { ...obj._doc, quantity: pro.quantity - 1 }];
        }
        return [...arr, obj._doc];
      }, []);

      console.log(updatequantitycart);
      newcart = updatequantitycart;
    } else {
      const updatequantitycart = newcart.filter((item) => item !== pro);
      console.log(updatequantitycart);
      newcart = updatequantitycart;
    }

    try {
      await account.updateOne(
        { email: req.headers.email },
        {
          $set: {
            cart: newcart,
          },
        }
      );
      return res.send({ status: true });
    } catch (error) {
      next(error);
    }
  };

  removeFromCart = async (req, res, next) => {
    console.log(req.params.id);
    const Acc = await account.findOne({ email: req.headers.email });
    let newcart = Acc.cart;
    const pro = await newcart.find((obj) =>
      obj.id_product.toString().includes(req.params.id)
    );
    if (pro) {
      console.log(pro);
      const deletecart = newcart.filter((item) => item !== pro);
      console.log(deletecart);
      newcart = deletecart;
    }

    try {
      await account.updateOne(
        { email: req.headers.email },
        {
          $set: {
            cart: newcart,
          },
        }
      );
      return res.send({ status: true });
    } catch (error) {
      next(error);
    }
  };

  // [POST] account/logout
  logout = async (req, res, next) => {
    try {
      let email = req.headers.email;
      let _account = await account.findOne({ email });

      // _account.token = "";

      // await _account.save();

      res.json({ result: "success" });
    } catch (error) {
      next(error);
    }
  };

  // testHistory = async (req, res, next) => {
  //   try {
  //     let email = req.body.email;
  //     let _account = await account.findOne({ email });

  //     let newHis = {
  //       action: "Received",
  //       changeBalance: "+222.4",
  //       atTimeBalance: 433.5,
  //     };

  //     _account.history.push(newHis);
  //     _account.save();

  //     res.send({ status: true });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // [GET] account/my-wallet
  getMyWallet = async (req, res, next) => {
    try {
      let email = req.headers.email;
      let _account = await account.findOne({ email });

      // Pagination
      const page = isNaN(req.query.page)
        ? 1
        : Math.max(1, parseInt(req.query.page));
      const perPage = isNaN(req.query.perPage)
        ? 10
        : Math.max(1, parseInt(req.query.perPage));
      const totalProducts = _account.history.length;
      const totalPages = Math.ceil(totalProducts / perPage);

      // Tạo 1 token để có thể verify đúng hệ thống kết nối
      const paymentToken = jwt.sign(
        {
          iss: process.env.MAIN_SYSTEM_NAME,
        },
        process.env.AUX_ACCESS_TOKEN_SECRET,
        { expiresIn: `${process.env.AUX_ACCESS_TOKEN_LIFE}` }
      );

      let dataSend = {
        email,
      };

      console.log("TOKEN được tạo: ", paymentToken, email);

      const response = await instance.post(
        `https://localhost:${process.env.AUX_PORT}/get-balance`,
        dataSend,
        {
          headers: {
            Authorization: `Bearer ${paymentToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("RES trả về", response.data);

      let data = response.data;
      let result = data.result;

      if (result === "fail") {
        return next(data.msg);
      }
      let balance = data.balance;

      let _accountNew = mongooseToObject(_account);
      let indexFrom = (page - 1) * perPage;

      let newHis = [];

      _accountNew.history.sort((a, b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);

        return dateB - dateA;
      });

      _accountNew.history.forEach((item, index) => {
        if (index >= indexFrom && index < indexFrom + perPage) {
          let timeEach = new Date(item.time).getTime();
          let remainder = timeEach.toString().slice(3);

          item.transID = remainder;
          item.timeFormat = formatDate(item.time);
          newHis.push(item);
        }
      });

      _accountNew.balance = balance;

      let accountData = {
        firstName: _accountNew.firstName,
        lastName: _accountNew.lastName,
        balance,
      };

      res.json({
        accountData,
        history: newHis,
        totalPages,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new accountController();
