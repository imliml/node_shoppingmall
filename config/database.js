// mongoose 상수화
const mongoose = require("mongoose");

// 데이터베이스 연결
const dbAddress =
  "mongodb+srv://admin:12345@cluster0-45mth.mongodb.net/shoppingmalldb?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

mongoose
  .connect(dbAddress, options)
  .then(() => console.log("MongoDb Connected ..."))
  .catch((err) => console.log(err));

//
