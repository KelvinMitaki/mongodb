const User = require("../src/models/users");
const assert = require("assert");

describe("finding users from the database", () => {
  let brayo, kevoh, wezo, barkeley;
  beforeEach(async () => {
    brayo = new User({ name: "Brayo" });
    kevoh = new User({ name: "Kevoh" });
    wezo = new User({ name: "Wezo" });
    barkeley = new User({ name: "Barkeley" });
    Promise.all([
      await brayo.save(),
      await kevoh.save(),
      await wezo.save(),
      await barkeley.save()
    ]);
  });
  it("finds a user with the name brayo", async () => {
    const users = await User.find({ name: "Brayo" });

    assert(brayo._id.toString() === users[0]._id.toString());
  });
  it("find a user with a particular id", async () => {
    const user = await User.findOne({ _id: brayo._id });

    assert(user.name === "Brayo");
  });
  it("Sorts skips and limits users from the database", async () => {
    const users = await User.find({}).sort({ name: 1 }).skip(1).limit(2);
    assert(users.length === 2);
    assert(users[0].name === "Brayo");
    assert(users[1].name === "Kevoh");
  });
});
