const Payment = require("../models/payment.model");

class accountController {
  getHome = async (req, res, next) => {
    try {
      res.send("home");
    } catch (error) {
      next(error);
    }
  };

  addAcc = async (req, res, next) => {
    try {
      let email = req.body.email;

      let newPayment = new Payment({
        email,
        balance: 0,
        history: [],
      });

      await newPayment.save()

      res.json({result: 'success'});
    } catch (error) {
      next(error);
    }
  };

  checkBalance = async (req, res, next) => {
    try {
      let email = req.body.email;
      let total = req.body.total;

      let paymentObj = await Payment.findOne({ email })

      if(total <= paymentObj.balance){
        return res.json({result: 'success'});
      }

      res.json({result: 'fail'})
    } catch (error) {
      next(error);
    }
  };

  getBalance = async (req, res, next) => {
    try {
      let email = req.body.email;
      let paymentObj = await Payment.findOne({ email })

      res.json({balance: paymentObj.balance})
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new accountController();
