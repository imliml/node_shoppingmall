const express = require("express");
const router = express.Router();
const productModel = require("../model/product");

// product 데이터 생성 api
router.post("/", (req, res) => {
  //데이터를 productModel에 저장할 내용 정리
  const product = new productModel({
    name: req.body.productName,
    price: req.body.productPrice,
  });

  product
    .save()
    .then((result) => {
      res.json({
        message: "success product posted",
        creagedProduct: result,
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });

  // res.json({
  //   message: "product posted",
  //   createdProduct: product,
  // });
});

// product 데이터 불러오는 api
router.get("/", (req, res) => {
  productModel
    .find()
    .then((docs) => {
      res.json({
        message: "product total get",
        count: docs.length,
        products: docs,
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });

  // res.json({
  //   message: "product get",
  // });
});

// 상세 데이터 불러오는 api
router.get("/:id", (req, res) => {
  const productId = req.params.id; //url아이디를 params로 갖고와서 상수화
  productModel
    .findById(productId)
    .then((doc) => {
      if (doc) {
        return res.json({
          message: "successful product detail get",
          productInfo: doc,
        });
      } else {
        res.json({
          message: "No product Id",
        });
      }
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
});

// product 데이터를 수정하는 api
router.patch("/:id", (req, res) => {
  const productId = req.params.id;

  const updatedOps = {};
  for (const ops of req.body) {
    updatedOps[ops.propName] = ops.value;
  }

  productModel
    .findByIdAndUpdate(productId, { $set: updatedOps })
    .then((result) => {
      res.json({
        message: "updated product",
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });

  // res.json({
  //   message: "product updated",
  // });
});

// product 데이터를 삭제하는 api
router.delete("/:id", (req, res) => {
  const productId = req.params.id;
  productModel
    .findByIdAndDelete(productId)
    .then(() => {
      res.json({
        message: "product delete",
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });

  res.json({
    message: "product deleted",
  });
});

// 라우터를 다른 파일에서도 불러올 수 있게 모듈화 한다.
module.exports = router;
