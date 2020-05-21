const assert = require("assert");
const User = require("../src/models/users");

describe("Creating records", () => {
  it("Saves a user", done => {
    const brayo = new User({ name: "Brayo" });
    brayo.save().then(() => {
      assert(!brayo.isNew);
      done();
    });
  });
});
