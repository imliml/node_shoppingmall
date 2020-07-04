// 1
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userModel = require("../model/user");

// 3 회원가입
router.post("/register", (req, res) => {
  // password 암호화
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    // password 암호화 과정중 에러 발생시
    if (err) {
      // 에러가 난 경우 else (불필요한 빌드를) 거치지 않기 위해 return 을 사용한다
      return res.json({
        message: err.message,
      });
    } else {
      // 정상적으로 암호화를 거친경우 db에 저장함.
      const user = new userModel({
        username: req.body.userName,
        email: req.body.email,
        password: hash,
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
    }
  });
});

// 4 로그인
router.post("/login", (req, res) => {});

// 2
module.exports = router;
