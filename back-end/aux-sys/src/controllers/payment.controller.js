require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const Payment = require("../models/payment.model");

class accountController {
  addAcc = async (req, res, next) => {
    try {
      let email = req.body.email;

      let paymentObj = await Payment.findOne({ email })
      if(paymentObj){
        return res.json({result: 'fail', msg: 'Payment account exists'});
      }

      let paymentToken = this.generateAccess(email);

      let newPayment = new Payment({
        email,
        balance: 0,
      });

      await newPayment.save()

      res.json({result: 'success', paymentToken});
    } catch (error) {
      next(error);
    }
  };

  getBalance = async (req, res, next) => {
    try {
      let email = req.user.email;

      let paymentObj = await Payment.findOne({ email })

      res.json({result:'success', balance: paymentObj.balance})
    } catch (error) {
      next(error);
    }
  };

  generateAccess = (email) => {
    return jwt.sign(
      {
        email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: `${process.env.ACCESS_TOKEN_LIFE}` }
    );
  };
}

module.exports = new accountController();
