const assert = require("assert");
const User = require("../src/models/users");
const BlogPost = require("../src/models/blogPost");
const Comment = require("../src/models/comment");

describe("associations", () => {
  let brayo, blogPost, comment;
  beforeEach(async () => {
    brayo = new User({ name: "Brayo" });
    blogPost = new BlogPost({
      title: "JavaScript",
      content: "JavaScript is a great language"
    });
    comment = new Comment({ content: "This is a new comment" });
    blogPost.comments.push(comment);
    brayo.blogPosts.push(blogPost);
    comment.user = brayo;
    Promise.all([
      await brayo.save(),
      await blogPost.save(),
      await comment.save()
    ]);
  });
  it("saves a relation between a user and a blogpost", async () => {
    const user = await User.findOne({ name: "Brayo" }).populate("blogPosts");

    assert(user.blogPosts[0].title === "JavaScript");
  });
  it("Saves a full relational tree", async () => {
    const user = await User.findOne({ name: "Brayo" }).populate({
      path: "blogPosts",
      populate: {
        path: "comments",
        model: "Comment",
        populate: {
          path: "user",
          model: "User"
        }
      }
    });
    assert(user.name === "Brayo");
    assert(user.blogPosts[0].title === "JavaScript");
    assert(user.blogPosts[0].comments[0].content === "This is a new comment");
    assert(user.blogPosts[0].comments[0].user.name === "Brayo");
  });
});
