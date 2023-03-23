const express = require("express");
const { registerUser, authUser, allUser } = require("../controller/userController");

const router = express.Router();

router.route("/").post(registerUser).get(allUser);
router.post("/login", authUser);

module.exports = router;
