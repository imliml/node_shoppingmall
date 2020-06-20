const express = require("express");
const router = express.Router();

// product 데이터 생성 api
router.post("/", (req, res) => {
  const product = {
    name: req.body.productName,
    price: req.body.productPrice,
  };

  res.json({
    message: "product posted",
    createdProduct: product,
  });
});

// product 데이터 불러오는 api
router.get("/", (req, res) => {
  res.json({
    message: "product get",
  });
});

// product 데이터를 수정하는 api
router.patch("/", (req, res) => {
  res.json({
    message: "product updated",
  });
});

// product 데이터를 삭제하는 api
router.delete("/", (req, res) => {
  res.json({
    message: "product deleted",
  });
});

// 라우터를 다른 파일에서도 불러올 수 있게 모듈화 한다.
module.exports = router;
