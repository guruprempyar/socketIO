const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const addMessage = asyncHandler(async (req, res) => {
  const { chatId, message } = req.body;
  if (!chatId || !message) {
    res.status(400);
    throw new Error("Please fill the required fields");
  }

  const newMsg = {
    sender: req.user._id,
    content: message,
    chat: chatId,
  };

  try {
    var msg = await Message.create(newMsg);
    var newMsg1 = await Message.findById(msg._id)
      .populate("sender", "name pic email")
      .populate("chat");

    newMsg1 = await User.populate(newMsg1, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: newMsg,
    });

    res.status(200).json(newMsg);
  } catch (error) {
    res.status(402);
    throw new Error(error.message);
  }
});

module.exports = { addMessage };
