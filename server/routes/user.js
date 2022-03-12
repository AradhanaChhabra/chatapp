const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const User = require("../models/user");

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const isCompare = await bcrypt.compare(req.body.password, user.password);
      if (!isCompare) {
        return res.send({ message: "Enter a valid password" });
      }
      const token = await user.getAuthToken();
      return res.send({ user, token });
    } else {
      return res.send({ message: "user not found" });
    }
  } catch (e) {
    return res.send({ message: e.message });
  }
};

const signupUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    // console.log(existingUser);
    if (!existingUser) {
      const user = new User();
      user.fullname = req.body.name;
      user.email = req.body.email;
      user.password = await bcrypt.hash(req.body.password, 8);
      await user.save();
      return res.send(user);
    } else {
      return res.send({ message: "User already exist" });
    }
  } catch (e) {
    console.log(e);
    return res.send({ message: e.message });
  }
};

router.post("/loginUser", loginUser);

router.post("/signupUser", signupUser);

module.exports = router;
