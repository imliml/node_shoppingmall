const express = require("express");
const router = express.Router();
const checkAuth = require("../config/check-auth");

const {
  products_get_all,
  products_register_product,
  products_get_detail,
  products_update_product,
  products_delete_product,
} = require("../controller/product");

// product 데이터 생성 api
router.post("/", checkAuth, products_register_product);

// product 데이터 불러오는 api
router.get("/", products_get_all);

// 상세 데이터 불러오는 api
router.get("/:id", checkAuth, products_get_detail);

// product 데이터를 수정하는 api
router.patch("/:id", checkAuth, products_update_product);

// product 데이터를 제하는 api
router.delete("/:id", checkAuth, products_delete_product);

// 라우터를 다른 파일에서도 불러올 수 있게 모듈화 한다.
module.exports = router;
