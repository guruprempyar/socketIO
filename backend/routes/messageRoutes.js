const express = require("express");
const protect = require("../middleware/authMiddleware");
const { addMessage } = require("../controller/messageController");
const router = express.Router();

router.route("/").post(protect, addMessage);
//router.route('/:chatId').get(protect, getAllMessage);
module.exports = router;
