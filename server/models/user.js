const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

UserSchema.methods.getAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "This is a chat engine");
  console.log(token);
  console.log(user);
  user.tokens.push({ token });
  await user.save();
  return token;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
