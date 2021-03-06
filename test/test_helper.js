const mongoose = require("mongoose");

before(done => {
  mongoose.connect("mongodb://127.0.0.1/users_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  mongoose.connection
    .once("open", () => done())
    .on("error", error => console.log("Error", error));
});

beforeEach(done => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
