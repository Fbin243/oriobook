require("dotenv").config();
const Payment = require("../models/payment.model");

class accountController {
  // [POST] account/generate-token
  // generatePaymentToken = async (req, res, next) => {
  //   try {
  //     let email = req.body.email;

  //     let paymentObj = await Payment.findOne({ email })
  //     if(!paymentObj){
  //       return res.json({result: 'fail', msg: `Payment account doesn't exist`});
  //     }

  //     // let paymentToken = this.generateAccess(email);

  //     // res.json({result: 'success', paymentToken});
  //     res.json({result: 'success'});
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  addAcc = async (req, res, next) => {
    try {
      let email = req.body.email;

      let paymentObj = await Payment.findOne({ email });
      if (paymentObj) {
        return res.json({ result: "fail", msg: "Payment account exists" });
      }

      let newPayment = new Payment({
        email,
        balance: 0,
      });

      await newPayment.save();

      // let paymentToken = this.generateAccess(email);

      // res.json({ result: "success", paymentToken });
      res.json({ result: "success" });
    } catch (error) {
      next(error);
    }
  };

  getBalance = async (req, res, next) => {
    try {
      console.log("GET BALANCE: ", req.body);
      let email = req.body.email;

      let paymentObj = await Payment.findOne({ email });

      res.json({ result: "success", balance: paymentObj.balance });
    } catch (error) {
      next(error);
    }
  };

  adjustBalance = async (req, res, next) => {
    try {
      let email = req.user.email;
      let changeBal = req.body.changeBal;
      let operation = changeBal[0];
      let money = parseFloat(changeBal.slice(1));

      let paymentObj = await Payment.findOne({ email });

      if (operation === "+") {
        paymentObj.balance += money;
      } else if (operation === "-") {
        paymentObj.balance -= money;
      }

      await paymentObj.save();

      res.json({ result: "success" });
    } catch (error) {
      next(error);
    }
  };

  // generateAccess = (email) => {
  //   return jwt.sign(
  //     {
  //       email,
  //     },
  //     process.env.ACCESS_TOKEN_SECRET,
  //     { expiresIn: `${process.env.ACCESS_TOKEN_LIFE}` }
  //   );
  // };
}

module.exports = new accountController();
