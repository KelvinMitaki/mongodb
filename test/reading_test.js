const User = require("../src/models/users");
const assert = require("assert");

describe("finding users from the database", () => {
  let brayo;
  beforeEach(async () => {
    brayo = new User({ name: "Brayo" });
    await brayo.save();
  });
  it("finds a user with the name brayo", async () => {
    const users = await User.find({ name: "Brayo" });
    console.log(users);
    assert(brayo._id.toString() === users[0]._id.toString());
  });
});
