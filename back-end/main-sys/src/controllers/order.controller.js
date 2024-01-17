require("dotenv").config();
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Account = require("../models/account.model");
const Category = require("../models/category.model");
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
      let email = req.headers ? req.headers.email : "";
      let account = await Account.findOne({ email });
      // console.log('email 2', req.headers);
      let id_account = account ? account._id : "";
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
        }).sort({ date: -1 });

      pendingOrder = mutipleMongooseToObject(pendingOrder);

      pendingOrder.forEach((item) => {
        let totalSum = item.detail.reduce((sum, item) => {
          let price = item.product ? item.product.price : 0;
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
      let email = req.headers.email;
      let total = req.body.total;
      let note = req.body.note;

      let _account = await Account.findOne({ email });
      let _adminAccount = await Account.findOne({ isAdmin: true });

      const dataSend = {};

      // Get balance of client
      const response = await instance.post(
        `https://localhost:${process.env.AUX_PORT}/get-balance`,
        dataSend,
        {
          headers: {
            Authorization: `Bearer ${_account.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      let data = response.data;
      let balance = data.balance;

      if (data.result !== "success") {
        return res.json({
          result: "fail",
          msg: "Fail to get balance of client",
        });
      }

      if (total > balance) {
        return res.json({ result: "fail", msg: `Insufficient balance` });
      }

      let cart = _account.cart;

      // Create new order
      let orderObj = new Order();
      orderObj.id_account = _account._id;
      orderObj.note = note;

      for (const item of cart) {
        try {
          let productAdd = await Product.findOne({ _id: item.id_product })
          .populate('id_category');

          let newObj = {
            id_product: item.id_product,
            product: mongooseToObject(productAdd),
            quantity: item.quantity,
            isReviewed: false,
          };

          orderObj.detail.push(newObj);
        } catch (error) {
          console.error('Lỗi khi thêm chi tiết đơn hàng:', error.message);
          // Xử lý lỗi nếu cần thiết
        }
      }

      await orderObj.save();
      // await orderObj.populate('detail.id_product').execPopulate();

      // Adjust balance of client
      let dataSend2 = {
        changeBal: `-${total}`,
      };

      const response2 = await instance.post(
        `https://localhost:${process.env.AUX_PORT}/adjust-balance`,
        dataSend2,
        {
          headers: {
            Authorization: `Bearer ${_account.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      let data2 = response2.data;

      if (data2.result !== "success") {
        return next("Fail to adjust balance");
      }

      // Create a new transaction for client
      let newHis = {
        action: "Paid",
        changeBalance: `-${total}`,
        atTimeBalance: balance - total,
      };

      _account.history.push(newHis);

      // --------------ADMIN------------------
      // Get balance for admin
      let dataSend3 = {
        email: _adminAccount.email,
      };

      const response3 = await instance.post(
        `https://localhost:${process.env.AUX_PORT}/get-balance-other`,
        dataSend3,
        {
          headers: {
            Authorization: `Bearer ${_account.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      let data3 = response3.data;
      let balance3 = data3.balance;

      if (data3.result !== "success") {
        return res.json({
          result: "fail",
          msg: "Fail to get balance of admin",
        });
      }

      // Adjust balance of admin
      let dataSend4 = {
        email: _adminAccount.email,
        changeBal: `+${total}`,
      };

      const response4 = await instance.post(
        `https://localhost:${process.env.AUX_PORT}/adjust-balance-other`,
        dataSend4,
        {
          headers: {
            Authorization: `Bearer ${_account.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      let data4 = response4.data;

      if (data4.result !== "success") {
        return next("Fail to adjust balance of admin");
      }

      // Create a new transaction for admin
      let newHis2 = {
        action: "Received",
        changeBalance: `+${total}`,
        atTimeBalance: balance3 + total,
      };

      _adminAccount.history.push(newHis2);

      // Remove from cart
      _account.cart = [];

      // Save _account
      await _account.save();
      await _adminAccount.save();

      res.json({ result: "success" });
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
        .sort({ date: -1 });

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

      let order = await Order.findOne({ _id: orderId })
        .populate({
          path: "detail.id_product",
          model: Product,
        })
        .populate({
          path: "id_account",
          model: Account,
        });

      order = mongooseToObject(order);

      let checkProDelete = order.detail.every((item) => {
        return item.id_product;
      });



      console.log('handle order', 'da qua day', order.detail);

      if(action !== "accept"){
        const updatedOrder = await Order.findOneAndUpdate(
          { _id: orderId },
          { $set: { status: "Cancelled" } },
          { new: true }
        );

        // ---------------------------------------------------

        let totalSum = order.detail.reduce((sum, item) => {
          let price = item.product?.price;
          let quantity = item.quantity;

          item.subtotal = roundNumber(price * quantity, 2);
          let total = roundNumber(sum + item.subtotal, 2);
          return total;
        }, 0);

        // a new transaction
        if (order.id_account) {
          await this.restoreClient(res, order.id_account?.email, totalSum);
        }

        return res.status(200).json({ result: "success" });
      }

      if(!checkProDelete){
        return res
            .status(200)
            .json({
              result: "fail",
              msg: "Some products don't exists",
            });
      }

      let boolHolder = order.detail.every((item) => {
        // let bool = item.quantity <= item.id_product?.stock;
        return item.quantity <= item.id_product?.stock;
      });

      const updateProductStock = async (order) => {
        try {
          for (const orderDetail of order.detail) {
            const productId = orderDetail.id_product?._id;

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

          return res.status(200).json({ result: "success" });
        } else {
          return res
            .status(200)
            .json({
              result: "fail",
              msg: "There is not a sufficient quantity of the product.",
            });
        }
      } else {
        const updatedOrder = await Order.findOneAndUpdate(
          { _id: orderId },
          { $set: { status: "Cancelled" } },
          { new: true }
        );

        // ---------------------------------------------------

        let totalSum = order.detail.reduce((sum, item) => {
          let price = item.product?.price;
          let quantity = item.quantity;

          item.subtotal = roundNumber(price * quantity, 2);
          let total = roundNumber(sum + item.subtotal, 2);
          return total;
        }, 0);

        // a new transaction
        if (order.id_account) {
          await this.restoreClient(res, order.id_account?.email, totalSum);
        }

        return res.status(200).json({ result: "success" });
      }
    } catch (error) {
      next(error);
    }
  };

  restoreClient = async (res, emailClient, total) => {
    try {
      let _account = await Account.findOne({ email: emailClient });
      let _adminAccount = await Account.findOne({ isAdmin: true });

      const dataSend = {};

      // Get balance of admin
      const response = await instance.post(
        `https://localhost:${process.env.AUX_PORT}/get-balance`,
        dataSend,
        {
          headers: {
            Authorization: `Bearer ${_adminAccount.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      let data = response.data;
      let balance = data.balance;

      if (data.result !== "success") {
        return res.json({
          result: "fail",
          msg: "Fail to get balance of admin",
        });
      }

      if (total > balance) {
        return res.json({ result: "fail", msg: `Insufficient balance` });
      }

      // Adjust balance of admin
      let dataSend2 = {
        changeBal: `-${total}`,
      };

      const response2 = await instance.post(
        `https://localhost:${process.env.AUX_PORT}/adjust-balance`,
        dataSend2,
        {
          headers: {
            Authorization: `Bearer ${_adminAccount.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      let data2 = response2.data;

      if (data2.result !== "success") {
        // return next("Fail to adjust balance");
        throw new Error("Fail to adjust balance");
      }

      // Create a new transaction for admin
      let newHis = {
        action: "Paid",
        changeBalance: `-${total}`,
        atTimeBalance: balance - total,
      };

      _adminAccount.history.push(newHis);

      // --------------CLIENT------------------
      // Get balance for client
      let dataSend3 = {
        email: emailClient,
      };

      const response3 = await instance.post(
        `https://localhost:${process.env.AUX_PORT}/get-balance-other`,
        dataSend3,
        {
          headers: {
            Authorization: `Bearer ${_adminAccount.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      let data3 = response3.data;
      let balance3 = data3.balance;

      if (data3.result !== "success") {
        return res.json({
          result: "fail",
          msg: "Fail to get balance of client",
        });
      }

      // Adjust balance of client
      let dataSend4 = {
        email: emailClient,
        changeBal: `+${total}`,
      };

      const response4 = await instance.post(
        `https://localhost:${process.env.AUX_PORT}/adjust-balance-other`,
        dataSend4,
        {
          headers: {
            Authorization: `Bearer ${_adminAccount.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      let data4 = response4.data;

      if (data4.result !== "success") {
        // return next("Fail to adjust balance of client");
        throw new Error("Fail to adjust balance of client");
      }

      // Create a new transaction for client
      let newHis2 = {
        action: "Received",
        changeBalance: `+${total}`,
        atTimeBalance: balance3 + total,
      };

      _account.history.push(newHis2);

      // Save _account
      await _account.save();
      await _adminAccount.save();

      // res.json({ result: "success" });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new orderController();
