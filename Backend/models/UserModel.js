const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
    required: false,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdOn: {
    type: Date,
    default: new Date().getTime(),
  },
});

module.exports = mongoose.model("user", userSchema);
