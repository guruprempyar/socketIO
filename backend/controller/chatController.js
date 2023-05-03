const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  //console.log("userId", userId);

  if (!userId) {
    res.status(400);
    throw new Error("User not found");
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        users: { $elemMatch: { $eq: req.user._id } },
      },
      {
        users: { $elemMatch: { $eq: userId } },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessages");

  isChat = User.populate(isChat, {
    path: "latestMessages.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      isGroupChat: false,
      chatName: "sender",
      users: [req.user._id, userId],
    };

    try {
      let chatAdd = await Chat.create(chatData);

      const fullChat = await Chat.findById(chatAdd._id).populate(
        "users",
        "-password"
      );
      res.status(200).send(fullChat);
    } catch (error) {
      res.status(402);
      throw new Error(error.message);
    }
  }

  return res.json({ userId });
});

module.exports = { accessChat };
