const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Username is required"]
  },
  postCount: Number
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
