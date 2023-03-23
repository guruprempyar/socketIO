const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password, pic } = req.body;

  console.log(name, email, password, pic);

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill the form correctly");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill the form correctly");
  }

  const user = await User.findOne({ email });

  if (user && user.matchPassword(password)) {
    res.status(200).json({
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User note exists");
  }
});

const allUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search ? {
    $or: [
      { name: { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } }
    ]
  } : {};

  const users = await User.find(keyword);

  res.json(users);
})

module.exports = { registerUser, authUser, allUser };
