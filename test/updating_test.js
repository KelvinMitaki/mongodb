const assert = require("assert");
const User = require("../src/models/users");

describe("Updating users", () => {
  let brayo;
  beforeEach(async () => {
    brayo = new User({ name: "Brayo", likes: 0 });
    await brayo.save();
  });

  const assertName = async operation => {
    try {
      await operation;
      const users = await User.find({});
      assert(users.length === 1);
      assert(users[0].name === "Kevoh");
    } catch (error) {
      console.log(error);
    }
  };

  it("instance type using set n save", async () => {
    brayo.set("name", "Kevoh");
    await assertName(brayo.save());
  });
  it("a model instance with update", async () => {
    await assertName(brayo.updateOne({ name: "Kevoh" }));
  });
  it("a model class update of many ", async () => {
    await assertName(User.updateMany({ name: "Brayo" }, { name: "Kevoh" }));
  });
  it("a model class of finding one and update", async () => {
    await assertName(
      User.findOneAndUpdate({ name: "Brayo" }, { name: "Kevoh" })
    );
  });
  it("a model class of finding by ID and updating", async () => {
    await assertName(User.findByIdAndUpdate(brayo._id, { name: "Kevoh" }));
  });
  it("Incrementing a users likes by one", async () => {
    await User.findOneAndUpdate({ name: "Brayo" }, { $inc: { likes: 1 } });
    const user = await User.findOne({ name: "Brayo" });
    assert(user.likes === 1);
  });
});
