// 1
const express = require("express");
const router = express.Router();
const userModel = require("../model/user");

// 3 회원가입
router.post("/register", (req, res) => {
  const user = new userModel({
    username: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  user
    .save()
    .then((result) => {
      res.json({
        message: "success created user",
        userInfo: {
          id: result._id,
          username: result.username,
          email: result.email,
          password: result.password,
        },
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
});

// 4 로그인
router.post("/login", (req, res) => {});

// 2
module.exports = router;
