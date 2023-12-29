const account = require("../models/account.model");
const authMethod = require("../methods/auth.methods");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class accountController {
  getHome =  async (req, res, next) => {
    try {
      
      res.send('home')
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new accountController();
