const assert = require("assert");
const User = require("../src/models/users");

describe("validating records", () => {
  it("requires a username", async () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Username is required");
  });
});
