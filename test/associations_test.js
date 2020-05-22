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
  });
});
