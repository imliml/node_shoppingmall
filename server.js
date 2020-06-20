// express 를 불러와서 상수화
const express = require("express");

// express 일반적인 기능들을 상수화
const app = express();

const productRoute = require("./routes/products");

// app.use((req, res) => {
//   res.json({
//     message: "It works!",
//   });
// });

app.use("/product", productRoute);

const PORT = 5000;

// 서버를 실행하는 코드
app.listen(PORT, console.log("server started"));
