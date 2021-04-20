const express = require("express");
require("dotenv").config(); // for loading enviornment variable
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.set("useFindAndModify", false);
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database Connected");
  });

app.use(passport.initialize());
app.use("/public", express.static(path.join(__dirname, "uploads")));
require("./middleware/passport")(passport);
app.use("/api/users", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comments", commentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
