const Order = require("../models/order.model");
const { Product, mainCategories, subCategories } = require("../models/product.model");

const Account = require("../models/account.model");
const { mutipleMongooseToObject, roundNumber, mongooseToObject } = require("../utils/mongoose");
class orderController {
  // [GET] order/pending
  getMyOrders = async (req, res, next) => {
    try {
      // ID_USER
      let id_account = '6572ae4ecbdcc4811d90a8e4'
      let path = req.path
      let pathConvert = path.charAt(1).toUpperCase() + path.slice(2);// /successfull -> Successful

      let pendingOrder = await Order.find({id_account, status: pathConvert})
        .populate({
          path: 'detail.id_product',
          model: Product,
        });

      pendingOrder = mutipleMongooseToObject(pendingOrder)

      pendingOrder.forEach(item => {
        let totalSum = item.detail.reduce((sum, item) => {
          let price = item.id_product.price;
          let quantity = item.quantity;

          item.subtotal = roundNumber(price * quantity, 2)
          let total = roundNumber(sum + item.subtotal, 2)
          return total;
        }, 0);

        item.total_price = totalSum
      })

      res.status(200).json(pendingOrder);
    } catch (error) {
      next(error);
    }
  };

  // *************** ADMIN *********************
  // [GET] order/manage-order
  getManageOrders = async (req, res, next) => {
    try {
      let orders = await Order.find({})
      .populate({
        path: 'id_account',
        model: Account,
      })
      .populate({
        path: 'detail.id_product',
        model: Product,
      });

      orders = mutipleMongooseToObject(orders)

      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  //[POST] /handle-manage-order/:id
  hanldeManageOrders = async (req, res, next) => {
    try {
      let orderId = req.params.id
      let action = req.body.action

      let order = await Order.findOne({_id: orderId})
      .populate({
        path: 'detail.id_product',
        model: Product,
      });

      order = mongooseToObject(order)

      // console.log(orderId);

      let boolHolder = order.detail.every(item => {
        let bool = item.quantity <= item.id_product.stock
        // console.log(item.quantity, item.id_product.stock, bool);
        return item.quantity <= item.id_product.stock
      })


      const updateProductStock = async (order) => {
        try {
          for (const orderDetail of order.detail) {
            const productId = orderDetail.id_product._id;
      
            // Retrieve the product from the database
            const product = await Product.findById(productId);
      
            if (!product) {
              console.error(`Product with id ${productId} not found.`);
              continue; // Skip to the next orderDetail if product not found
            }
      
            const newStock = product.stock - orderDetail.quantity;
      
            // Update the product with the new stock value
            await Product.findByIdAndUpdate(productId, { $set: { stock: newStock } });
      
            // console.log(`Product ${productId} stock updated to ${newStock}`);
          }
        } catch (error) {
          console.error('Error updating product stock:', error);
        }
      };

      if(action == 'accept'){
        if(boolHolder){
          await updateProductStock(order)

          const updatedOrder = await Order.findOneAndUpdate(
            { "_id": orderId },
            { $set: { 'status': "Successful" } },
            { new: true }
          );
          // console.log(updatedOrder);
          res.status(200).json({msg: 'success'});
        }else{
          res.status(200).json({msg: 'fail'});
        }
      }else{
        const updatedOrder = await Order.findOneAndUpdate(
          { "_id": orderId },
          { $set: { 'status': "Cancelled" } },
          { new: true }
        );
        res.status(200).json({msg: 'success'});
      }
      
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new orderController();
