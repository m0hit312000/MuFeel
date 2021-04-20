const express = require("express");
const postRouter = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/post");
const passport = require("passport");
const validatePostInput = require("../validation/post");
const { upload } = require("../middleware/upload");

postRouter.get("/", (req, res) => {
  Post.find({})
    .then((post) => {
      return res.status(200).json(post);
    })
    .catch((err) => res.status(400).json({ user: "Error fetching post" }));
});

postRouter.get("/:id", (req, res) => {
  Post.find({ _id: req.params.id })
    .populate("author")
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      return res.status(400).json({ id: "Error fetching post" });
    });
});

postRouter.get("/author/:author", (req, res) => {
  Post.find({ author: req.params.author })
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((err) =>
      res.status(400).json({ author: "Error fetching post of author" })
    );
});

postRouter.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  upload.single("postImg"),
  (req, res) => {
    const author = req.user._id;
    const post = req.body;
    const { errors, isValid } = validatePostInput(post);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    post.author = author;
    post.postImg = req.file.filename;
    const newpost = new Post(post);
    newpost
      .save()
      .then((doc) => res.json(doc))
      .catch((err) => console.log({ create: "Error creating new post" }));
  }
);

postRouter.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("postImg"),
  (req, res) => {
    const author = req.user._id;
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const title = req.body.title;
    const description = req.body.description;
    const body = req.body.body;

    const updates = {
      title,
      description,
      body,
    };

    if (req.file) {
      const postImg = req.file.filename;
      updates.postImg = postImg;
    }
    Post.findOneAndUpdate(
      { author, _id: req.params.id },
      { $set: updates },
      { new: true }
    )
      .then((doc) => res.status(200).json(doc))
      .catch((err) =>
        res.status(400).json({ update: "Error updating existing post" })
      );
  }
);

postRouter.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const author = req.user._id;
    Post.findOneAndDelete({ author, _id: req.params.id })
      .then((doc) => res.status(200).json(doc))
      .catch((err) =>
        res.status(400).json({ delete: "Error deleting a post" })
      );
  }
);

module.exports = postRouter;
