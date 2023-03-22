//Node v18.12.1
const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
connectDB();

app.use(express.json());

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log(`Server started on port 5000`);
});
