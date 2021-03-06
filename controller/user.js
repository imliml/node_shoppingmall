const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user");

exports.user_get_all = (req, res) => {
  userModel
    .find()
    .then((docs) => {
      res.json({
        userInfos: docs,
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
};

exports.user_register = (req, res) => {
  const { username, email, password } = req.body;

  // 이메일 체크유무 확인 from database
  userModel
    .findOne({ email }) // {email: email} 이름이 같을 경우 생략 가능.
    .then((user) => {
      // database에 사용자가 있는 경우 에러 메시지를 뿌려줌.
      if (user) {
        return res.json({
          message: "email already exists",
        });
      } else {
        // email이 없는 경우에는 database에 저장
        // password 암호화
        bcrypt.hash(password, 10, (err, hash) => {
          // password 암호화 과정중 에러 발생시
          if (err) {
            // 에러가 난 경우 else (불필요한 빌드를) 거치지 않기 위해 return 을 사용한다
            return res.json({
              message: err.message,
            });
          } else {
            // 정상적으로 암호화를 거친경우 db에 저장함.
            const user = new userModel({
              username,
              email,
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
      }
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
};

exports.user_login = (req, res) => {
  const { email, password } = req.body;

  // email 체크 -> password 체크 -> 로그인 완료 메시지(token반환)
  userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json({
          message: "No email info",
        });
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err || result === false) {
            return res.json({
              message: "password incorrect",
            });
          } else {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id,
              },
              process.env.SECRET_KEY,
              { expiresIn: "1h" }
            );
            res.json({
              message: "Auth successful",
              tokenInfo: token,
            });
          }
        });
      }
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
};
