require("dotenv").config();
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Account = require("../models/account.model");
const axios = require("axios");
const https = require("https");
const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const {
  mutipleMongooseToObject,
  roundNumber,
  mongooseToObject,
} = require("../utils/mongoose");
class orderController {
  // [GET] order/pending
  getMyOrders = async (req, res, next) => {
    try {
      // ID_USER
      let email = req.headers ? req.headers.email : ''
      let account = await Account.findOne({ email })
      // console.log('email 2', req.headers);
      let id_account = account ? account._id : '';
      let path = req.path;
      let pathConvert = path.charAt(1).toUpperCase() + path.slice(2); // /successfull -> Successful

      const page = isNaN(req.query.page)
        ? 1
        : Math.max(1, parseInt(req.query.page));
      const perPage = isNaN(req.query.perPage)
        ? 2
        : Math.max(1, parseInt(req.query.perPage));
      const totalProducts = await Order.countDocuments({
        id_account,
        status: pathConvert,
      });
      const totalPages = Math.ceil(totalProducts / perPage);
      // console.log(totalPages, totalProducts, pathConvert);
      let pendingOrder = await Order.find({ id_account, status: pathConvert })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .populate({
          path: "detail.id_product",
          model: Product,
        });

      pendingOrder = mutipleMongooseToObject(pendingOrder);

      pendingOrder.forEach((item) => {
        let totalSum = item.detail.reduce((sum, item) => {
          let price = item.id_product ? item.id_product.price : 0;
          let quantity = item.quantity;

          item.subtotal = roundNumber(price * quantity, 2);
          let total = roundNumber(sum + item.subtotal, 2);
          return total;
        }, 0);

        item.total_price = totalSum;
      });

      res.status(200).json({ pendingOrder, totalPages });
    } catch (error) {
      next(error);
    }
  };

  // [POST] order/place
  placeOrder = async (req, res, next) => {
    try {
      // console.log('total', req.body.total);

      let dataSend = {
        email: req.headers.email,
        total: req.body.total,
      };

      const response = await instance.post(
        `https://localhost:${process.env.AUX_PORT}/check-balance`,
        dataSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let data = response.data;
      if(data.result === 'fail'){
        res.json({...data, msg: `Insufficient balance`})
      }

      res.json({...data})
    } catch (error) {
      next(error);
    }
  };

  // *************** ADMIN *********************
  // [GET] order/manage-order
  getManageOrders = async (req, res, next) => {
    try {
      const page = isNaN(req.query.page)
        ? 1
        : Math.max(1, parseInt(req.query.page));
      const perPage = isNaN(req.query.perPage)
        ? 10
        : Math.max(1, parseInt(req.query.perPage));
      const totalProducts = await Order.countDocuments({});
      const totalPages = Math.ceil(totalProducts / perPage);
      const orders = await Order.find({})
        .skip((page - 1) * perPage)
        .limit(perPage)
        .populate({
          path: "id_account",
          model: Account,
        })
        .populate({
          path: "detail.id_product",
          model: Product,
        });
      res.status(200).json({ orders, totalPages });
    } catch (error) {
      next(error);
    }
  };

  //[POST] /handle-manage-order/:id
  hanldeManageOrders = async (req, res, next) => {
    try {
      let orderId = req.params.id;
      let action = req.body.action;

      let order = await Order.findOne({ _id: orderId }).populate({
        path: "detail.id_product",
        model: Product,
      });

      order = mongooseToObject(order);

      let boolHolder = order.detail.every((item) => {
        let bool = item.quantity <= item.id_product.stock;
        return item.quantity <= item.id_product.stock;
      });

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
            await Product.findByIdAndUpdate(productId, {
              $set: { stock: newStock },
            });
          }
        } catch (error) {
          console.error("Error updating product stock:", error);
        }
      };

      if (action == "accept") {
        if (boolHolder) {
          await updateProductStock(order);

          const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId },
            { $set: { status: "Successful" } },
            { new: true }
          );
          res.status(200).json({ msg: "success" });
        } else {
          res.status(200).json({ msg: "fail" });
        }
      } else {
        const updatedOrder = await Order.findOneAndUpdate(
          { _id: orderId },
          { $set: { status: "Cancelled" } },
          { new: true }
        );
        res.status(200).json({ msg: "success" });
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new orderController();
