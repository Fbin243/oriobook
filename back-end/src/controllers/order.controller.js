const Order = require("../models/order.model");
const Product = require("../models/product.model");
const { mutipleMongooseToObject } = require("../utils/mongoose");
class orderController {
  // [GET] order/pending
  getPendingOrder = async (req, res, next) => {
    try {
      let id_account = '656e9b87e5febefabe5a36a9'
      let pendingOrder = await Order.find({id_account: id_account, status: 'Pending'})
        .populate({
          path: 'detail.id_product',
          model: Product,
        });

      pendingOrder = mutipleMongooseToObject(pendingOrder)

      pendingOrder.forEach(item => {
        let totalSum = item.detail.reduce((sum, item) => {
          let price = item.id_product.price;
          let quantity = item.quantity;
          return sum + price * quantity;
        }, 0);
        // console.log(totalSum);

        item.total_price = totalSum
        console.log(item.total_price);
      })

      res.status(200).json(pendingOrder);
    } catch (error) {
      next(error);
    }
  };
  // *************** ADMIN *********************

}

module.exports = new orderController();
