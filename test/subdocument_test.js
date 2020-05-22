const User = require("../src/models/users");
const assert = require("assert");

describe("subdocuments", () => {
  it("Adding a subdocument", async () => {
    const brayo = new User({ name: "Brayo", posts: [{ title: "newPost" }] });
    await brayo.save();
    const user = await User.findOne({ name: "Brayo" });
    assert(user.posts[0].title === "newPost");
  });
  it("Adding a subdocument to an existing user", async () => {
    const brayo = new User({ name: "Brayo", posts: [] });
    await brayo.save();
    const user = await User.findOne({ name: "Brayo" });
    user.posts.push({ title: "newPost" });
    await user.save();
    const user1 = await User.findOne({ name: "Brayo" });
    assert(user1.posts[0].title === "newPost");
  });
  it("Can removing an existing subdocument from a document", async () => {
    const brayo = new User({ name: "Brayo", posts: [{ title: "newPost" }] });
    await brayo.save();
    const user = await User.findOne({ name: "Brayo" });

    user.posts[0].remove();
    await user.save();
    const user1 = await User.findOne({ name: "Brayo" });
    assert(user1.posts.length === 0);
  });
});
