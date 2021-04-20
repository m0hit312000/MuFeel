const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const validateSignUpInput = require("../validation/signup");
const validateLoginInput = require("../validation/login");
const User = require("../models/user");
const { upload } = require("../middleware/upload");

userRouter.post("/signup", upload.single("profilePicture"), (req, res) => {
  const { errors, isValid } = validateSignUpInput(req.body);
  const { user_name, email, password, role, firstname, lastname } = req.body;

  // req.body.profilePicture = req.file.filename;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email, user_name }).then((user) => {
    if (user) {
      if (user.email === email) {
        return res.status(400).json({ email: "Email already exist" });
      } else if (user.user_name === user_name) {
        return res.status(400).json({ email: "Email already exist" });
      }
    } else {
      const user = new User({
        user_name,
        email,
        password,
        firstname,
        lastname,
        profilePicture: req.file.filename,
        role,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user
            .save()
            .then((user) => res.json(user))
            .catch((err) =>
              console.log({ error: "Error creating a new user" }, err)
            );
        });
      });
    }
  });
});

userRouter.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ email: "Email not found" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          user_name: user.user_name,
          role: user.role,
        };
        jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
          if (err) {
            console.log(err);
          }
          return res.json({
            success: true,
            token: "Bearer " + token,
          });
        });
      } else {
        return res.status(400).json({ password: "Password Incorrect" });
      }
    });
  });
});

module.exports = userRouter;
