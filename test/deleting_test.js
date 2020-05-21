const User = require("../src/models/users");
const assert = require("assert");

describe("deleting a user from the database", () => {
  let brayo;
  beforeEach(async () => {
    brayo = new User({ name: "Brayo" });
    await brayo.save();
  });
  it("Model instance remove", async () => {
    await brayo.remove();
    const result = await User.findOne({ name: "Brayo" });
    assert(result === null);
  });
  it("Class method deleteMany", async () => {
    await User.deleteMany({ name: "Brayo" });
    const result = await User.findOne({ name: "Brayo" });
    assert(result === null);
  });
  it("Class method findOneAndDelete", async () => {
    await User.findOneAndDelete({ name: "Brayo" });
    const result = await User.findOne({ name: "Brayo" });
    assert(result === null);
  });
  it("Class method findByIdAndDelete", async () => {
    await User.findByIdAndDelete(brayo._id);
    const result = await User.findOne({ name: "Brayo" });
    assert(result === null);
  });
});
