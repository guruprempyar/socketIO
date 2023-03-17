const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default: "https://i.stack.imgur.com/l60Hf.png",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userModel);

module.exports = User;
