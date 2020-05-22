const mongoose = require("mongoose");
const PostSchema = require("../models/postSchema");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    validate: {
      validator: name => name.length > 2,
      message: "Name must be longer than two characters"
    }
  },
  likes: Number,
  posts: [PostSchema],
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "BlogPost"
    }
  ]
});

UserSchema.virtual("postCount").get(function () {
  console.log(this);
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
