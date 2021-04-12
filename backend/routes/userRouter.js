const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const validateSignUpInput = require("../validation/signup");
const validateLoginInput = require("../validation/login");
const User = require("../models/user");

userRouter.post("/signup", (req, res) => {
  const { errors, isValid } = validateSignUpInput(req.body);
  const { user_name, email, password, role } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      if (user.email === email) {
        return res.status(400).json({ email: "Email already exist" });
      }
    } else {
      const user = new User({ user_name, email, password, role });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user
            .save()
            .then((user) => res.json(user))
            .catch((err) =>
              console.log({ error: "Error creating a new user" })
            );
        });
      });
    }
  });
});

userRouter.post("/login", (req, res) => {
  const { errors, isValid } = validateSignUpInput(req.body);
  const { user_name, email, password } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ email: "Email not found" });
  });

  bcrypt.compare(password, user.password).then((isMatch) => {
    if (isMatch) {
      const payload = {
        id: user._id,
        user_name: user.user_name,
        role: user.role,
      };
      jwt.sign(payload, SECRET, { expiresIn: "1days" }, (err, token) => {
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

module.exports = userRouter;
