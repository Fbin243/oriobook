const fetchOrderDetails = async (_orderId) => {
      console.log(_orderId);
      orderId.value = _orderId
      const response = await axios.get(`http://localhost:3000/order/manage-order-details/${_orderId}`);
      foundObject.value = response.data;
      console.log(foundObject.value);
    }

    const clickModal = async (_orderId) => {
      // await fetchOrderDetails(_orderId)
      $("#exampleModal").modal('show');
    }

    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/order/manage-order`);
        orderData.value = response.data;
        console.log(orderData.value);
      } catch (error) {
        console.error("Error calling API:", error);
      }
    };

    const fetchOrderDetails = async (_orderId) => {

    }

    const clickModal = async (_orderId) => {
      try {
        console.log(_orderId);
        orderId.value = _orderId
        // const response = await axios.get(`http://localhost:3000/order/manage-order-details/${_orderId}`);
        // foundObject.value = response.data;
        console.log(foundObject.value);

        $("#exampleModal").modal('show');
      }catch (error) {
        console.error("Error calling API:", error);
      }
    }

getManageOrdersDetails = async (req, res, next) => {
    try {
      // ID_USER
      let order = await Order.findOne({_id: req.params.id})
      .populate({
        path: 'id_account',
        model: Account,
      })
      .populate({
        path: 'detail.id_product',
        model: Product,
      });

      order = mongooseToObject(order)
      // console.log(req.params.id);

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };