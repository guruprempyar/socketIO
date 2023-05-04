const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  //console.log("req.body", req.body);

  if (!userId) {
    res.status(400);
    throw new Error("User not found");
  }

  var isChat = await Chat.find({
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
  //console.log("isChat:", isChat);
  isChat = await User.populate(isChat, {
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

  //return res.json({ userId });
});

const fetchChat = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessages")
      .sort({ createdAt: -1 })
      .then(async (result) => {
        result = await User.populate(result, {
          path: "latestMessages.sender",
          select: "name pic email",
        });

        res.status(200).send(result);
      });
  } catch (err) {
    res.status(402);
    throw new Error(err.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.users) {
    return res.send(400).send({ message: "Please fill the required fields." });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .send(400)
      .send({ message: "Please add atleast 2 user for group chat." });
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      isGroupChat: true,
      users: users,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (err) {
    res.status(402);
    throw new Error(err.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updateChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updateChat) {
    res.status(400);
    throw new Error("Chat not found");
  } else {
    res.status(200).json(updateChat);
  }
});

const addGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(400);
    throw new Error("Chat not found");
  } else {
    res.status(200).json(added);
  }
});

const removeGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(400);
    throw new Error("Chat not found");
  } else {
    res.status(200).json(removed);
  }
});

module.exports = {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addGroup,
  removeGroup,
};
