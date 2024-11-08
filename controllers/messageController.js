import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.Id;
    const recieverId = req.params.Id;
    const { message } = req.body;

    let getConversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });
    if (!getConversation) {
      getConversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    let newMessage = await Message.create({
      senderId,
      recieverId,
      message,
    });
    await newMessage.save();

    if (newMessage) {
      getConversation.messages.push(newMessage._id);
    }

    await getConversation.save();
    res.status(201).json({ message: "saved" });
  } catch (err) {
    console.log(`error at send message controller :${err}`);
  }
};
export const getMessage = async (req, res) => {
  try {
    const senderId = req.Id;
    const recieverId = req.params.Id;

    let getConversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    }).populate("messages");

    res.status(200).json(getConversation?.messages);
  } catch (err) {
    console.log(`error at get message controller${err}`);
  }
};
