// 1
const mongoose = require("mongoose");

// 2
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// 3
module.exports = mongoose.model("user", userSchema);
