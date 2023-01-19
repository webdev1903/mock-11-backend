const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const User = require("../models/user.model");

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

router.post("/signup", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(200).send({ message: "user already exists" });
    }
    user = await User.create(req.body);
    return res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    let match = user.comparePassword(req.body.password);
    if (!match) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
    let token = newToken(user);
    return res.status(200).send({ user, token, message: "Login Successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
