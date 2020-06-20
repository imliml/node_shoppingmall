// 1
const express = require("express");
const router = express.Router();

// 3 order 데이터 생성 api
router.post("/", (req, res) => {
  res.json({
    message: "order posted",
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
