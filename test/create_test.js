const assert = require("assert");
const User = require("../src/models/users");

describe("Creating records", () => {
  it("Saves a user", async () => {
    const brayo = new User({ name: "Brayo" });
    await brayo.save();
    assert(!brayo.isNew);
  });
});
