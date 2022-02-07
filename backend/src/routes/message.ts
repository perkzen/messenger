import { Router } from "express";
import { Errors } from "../constants/errors";
import Message from "../models/Message";

const router = Router();

// post new message
router.post("/", async (req, res) => {
  try {
    const newMessage = await Message.create({
      senderId: req.body.senderId,
      conversationId: req.body.conversationId,
      text: req.body.text,
      time: req.body.time,
      date: req.body.date,
    });
    res.status(200).json(newMessage);
  } catch (e) {
    res.status(500).json({ message: Errors.SERVER });
  }
});

export default router;
