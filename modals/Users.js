const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  following: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      username: String,
      avatar: String
    }
  ],

  followers: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      username: String,
      avatar: String
    }
  ]
});

module.exports = Users = mongoose.model("users", UsersSchema);
