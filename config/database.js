// mongoose 상수화
const mongoose = require("mongoose");

// 데이터베이스 연결

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
};

mongoose
  .connect(process.env.MONGODB_URI, options)
  .then(() => console.log("MongoDb Connected ..."))
  .catch((err) => console.log(err));
