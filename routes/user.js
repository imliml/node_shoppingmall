// 1
const express = require("express");
const router = express.Router();

const checkAuth = require("../config/check-auth");
const {
  user_get_all,
  user_register,
  user_login,
} = require("../controller/user");

// 3-1 전체user 불러오기
router.get("/total", checkAuth, user_get_all);

// 3 회원가입
router.post("/register", user_register);

// 4 로그인
router.post("/login", user_login);

// 2
module.exports = router;
