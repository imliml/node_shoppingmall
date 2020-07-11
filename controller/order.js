const orderModel = require("../model/order");

exports.orders_get_all = (req, res) => {
  orderModel
    .find()
    .populate("product", ["name", "price"]) // product의 하위 메뉴를 보여줌.
    .then((docs) => {
      const response = {
        count: docs.length,
        orders: docs.map((doc) => {
          return {
            id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:5000/order/" + doc._id,
            },
          };
        }),
      };
      res.json(response);
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
};

exports.orders_detail_order = (req, res) => {
  const orderId = req.params.id;

  orderModel
    .findById(orderId)
    .then((doc) => {
      res.json({
        message: "order detail get",
        orderInfo: {
          id: doc._id,
          product: doc.product,
          quantity: doc.quantity,
          request: {
            type: "GET",
            url: "http://localhost5000:/order",
          },
        },
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
};

exports.orders_register_order = (req, res) => {
  const order = new orderModel({
    product: req.body.productId,
    quantity: req.body.qty,
  });

  order
    .save()
    .then((result) => {
      res.json({
        message: "order product",
        orderProduct: {
          id: result._id,
          product: result.product,
          quantity: result.quantity,
          request: {
            type: "GET",
            url: "http://localhost:5000/order/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
};

exports.orders_update_order = (req, res) => {
  const orderId = req.params.id;

  const updatedOps = {};
  for (const ops of req.body) {
    updatedOps[ops.propName] = ops.value;
  }

  orderModel
    .findByIdAndUpdate(orderId, { $set: updatedOps })
    .then((result) => {
      res.json({
        message: "updated order",
        request: {
          type: "GET",
          url: "http://localhost:5000/order/" + orderId,
        },
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
};

exports.orders_delete_order = (req, res) => {
  const orderId = req.params.id;

  orderModel
    .findByIdAndDelete(orderId)
    .then(() => {
      res.json({
        message: "order delete",
        request: {
          type: "GET",
          url: "http://localhost:5000/order",
        },
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
};
