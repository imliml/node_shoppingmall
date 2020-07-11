// 1
const express = require("express");
const router = express.Router();
const checkAuth = require("../config/check-auth");
const {
  orders_get_all,
  orders_register_order,
  orders_update_order,
  orders_detail_order,
  orders_delete_order,
} = require("../controller/order.js");

// 3 order 데이터 생성 api
router.post("/", checkAuth, orders_register_order);

// 4 order 데이터 불러오는 api
router.get("/", checkAuth, orders_get_all);

// 4-1 디테일한 order 데이터를 불러오는 api
router.get("/:id", checkAuth, orders_detail_order);

// 5 order 데이터 수정하는 api
router.patch("/:id", checkAuth, orders_update_order);

// 6 order 데이터 삭제하는 api
router.delete("/:id", checkAuth, orders_delete_order);

// 2
module.exports = router;
