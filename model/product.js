//1
const mongoose = require("mongoose");

//2
const productSchema = mongoose.Schema({
  name: String,
  price: Number,
});

//3
module.exports = mongoose.model("product", productSchema);
