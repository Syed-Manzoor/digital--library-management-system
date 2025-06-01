import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, passwordHash: hash });
    const savedUser = await user.save();
    res.status(201).json({ message: 'User registered', userId: savedUser._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
