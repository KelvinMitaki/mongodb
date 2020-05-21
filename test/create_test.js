const assert = require("assert");
const User = require("../src/models/users");

describe("Creating records", () => {
  it("Saves a user", () => {
    const brayo = new User({ name: "Brayo" });
    brayo.save();
  });
});
