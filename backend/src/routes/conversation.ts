import { Router } from "express";
import { Errors } from "../constants/errors";
import Conversation from "../models/Conversation";
import Message from "../models/Message";

const router = Router();

//start conversation
router.post("/", async (req, res) => {
  try {
    //check if it already exists
    const oldConversation = await Conversation.findOne({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });

    if (!oldConversation) {
      // create new conversation
      await Conversation.create(
        {
          members: [req.body.senderId, req.body.receiverId],
        },
        (err, conversation) => {
          if (err) return res.status(500).json({ message: Errors.SERVER });
          return res.status(200).json(conversation);
        }
      );
    } else {
      res.status(200).json(oldConversation);
    }
  } catch (e) {
    res.status(500).json({ message: Errors.SERVER });
  }
});

router.post("/messages", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.body.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(Errors.SERVER);
  }
});

export default router;
