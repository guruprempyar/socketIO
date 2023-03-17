//Node v18.12.1
const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();

connectDB();
app.listen(5000, () => {
  console.log(`Server started on port 5000`);
});
