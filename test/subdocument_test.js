const User = require("../src/models/users");
const assert = require("assert");

describe("subdocuments", () => {
  it("Adding a subdocument", async () => {
    const brayo = new User({ name: "Brayo", posts: [{ post: "newPost" }] });
    await brayo.save();
    const user = await User.findOne({ name: "Brayo" });
    assert(user.posts[0].post === "newPost");
  });
});
