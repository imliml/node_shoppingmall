// express 를 불러와서 상수화
const express = require("express");

//morgan을 불러와서 상수화
const morgan = require("morgan");

//body-parser 불러와서 상수화
const bodyParser = require("body-parser");

// express 일반적인 기능들을 상수화
const app = express();

// 라우터파일 불러오기
const productRoute = require("./routes/products");
const orderRoute = require("./routes/orders");

// 미들웨어 설정
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 라우터 설정
app.use("/product", productRoute);
app.use("/order", orderRoute);

const PORT = 5000;

// 서버를 실행하는 코드
app.listen(PORT, console.log("server started"));
