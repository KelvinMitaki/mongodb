const mongoose = require("mongoose");
const assert = require("assert");
const BlogPost = require("../src/models/blogPost");
const User = require("../src/models/users");

describe("Removing users", () => {
  let brayo, blogPost;
  beforeEach(async () => {
    brayo = new User({ name: "Brayo" });
    blogPost = new BlogPost({
      title: "JavaScript",
      content: "JavaScript is a great language"
    });
    brayo.blogPosts.push(blogPost);
    Promise.all([await brayo.save(), await blogPost.save()]);
  });
  it("Removes remaining blogposts related to a certain user when acc deleted", async () => {
    await brayo.remove();
    const res = await BlogPost.countDocuments();
    assert(res === 0);
  });
});
