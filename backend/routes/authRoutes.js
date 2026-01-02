const express = require("express");
const User = require("../db/User"); // Mongoose model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(201).send({
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.send({
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
// Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ error: "User not found" });

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();

    res.send({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
