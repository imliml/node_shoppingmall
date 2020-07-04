// 1
const express = require("express");
const router = express.Router();
const orderModel = require("../model/order");

// 3 order 데이터 생성 api
router.post("/", (req, res) => {
  const order = new orderModel({
    product: req.body.productId,
    quantity: req.body.qty,
  });

  order
    .save()
    .then((result) => {
      res.json({
        message: "order product",
        orderProduct: result,
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
});

// 4 order 데이터 불러오는 api
router.get("/", (req, res) => {
  res.json({
    message: "order get",
  });
});

// 5 order 데이터 수정하는 api
router.patch("/", (req, res) => {
  res.json({
    message: "order update",
  });
});

// 6 order 데이터 삭제하는 api
router.delete("/", (req, res) => {
  res.json({
    message: "order delete",
  });
});

// 2
module.exports = router;
