const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addGroup,
  removeGroup,
} = require("../controller/chatController");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupadd").put(protect, addGroup);
router.route("/groupremove").put(protect, removeGroup);

module.exports = router;
