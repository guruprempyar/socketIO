const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decode token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.error("err", err.message);
      res.status(401);
      throw new Error("Invalid token.");
    }
  } else {
    res.status(400);
    throw new Error("The token is required.");
  }
});

module.exports = protect;
