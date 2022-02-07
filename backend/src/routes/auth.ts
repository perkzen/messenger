import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { Errors } from "../constants/errors";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create(
      {
        username: req.body.username,
        password: hashedPassword,
        avatar: req.body.avatar,
      },
      (err, user) => {
        if (err) res.status(409).json({ message: Errors.REGISTER });
        res.status(200).json(user);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ message: Errors.LOGIN });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).json({ message: Errors.LOGIN });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
