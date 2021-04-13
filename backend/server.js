const express = require("express");
require("dotenv").config(); // for loading enviornment variable
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
require("./middleware/passport")(passport);
app.use("/api/users", userRouter);
app.use("/api/post", postRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
