class accountController {
  getHome = async (req, res, next) => {
    try {
      res.send("home");
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new accountController();
