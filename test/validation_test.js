const assert = require("assert");
const User = require("../src/models/users");

describe("validating records", () => {
  it("requires a username", async () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Username is required");
  });
  it("checks the length of the username", async () => {
    const user = new User({ name: "Ke" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name must be longer than two characters");
  });
  it("Disallows invalid users from being saved from the database", async () => {
    try {
      const user = new User({ name: "Ke" });
      await user.save();
    } catch (validationError) {
      const { message } = validationError.errors.name;
      assert(message === "Name must be longer than two characters");
    }
  });
});
