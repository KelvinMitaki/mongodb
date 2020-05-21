const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/users_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection
  .once("open", () => console.log("Good to go"))
  .on("error", error => console.log("Error", error));
