const express = require("express");
const commentRouter = express.Router();
const mongoose = require("mongoose");
const Comment = require("../models/comment");
const passport = require("passport");
const comment = require("../models/comment");

commentRouter.get("/:postId", (req, res) => {
  Comment.find({ post: req.params.postId })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) =>
      res.status(400).json({ comment: "Unable to fetch errors" })
    );
});

commentRouter.post(
  "/create/:postId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.body.author = req.user._id;
    req.body.post = req.params.postId;
    const newComment = new Comment(req.body);
    newComment
      .save()
      .then((comment) => res.json(comment))
      .catch((err) => console.log({ create: "Error posting comment" }));
  }
);

commentRouter.put(
  "/:postId/:commentId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const author = req.user._id;
    const { comment } = req.body;
    Comment.findOneAndUpdate(
      { author, _id: req.params.commentId, post: req.params.postId },
      { $set: { comment } },
      { new: true }
    )
      .then((comment) => res.status(200).json(comment))
      .catch((err) =>
        res.status(400).json({ update: "Error updating comment" })
      );
  }
);

commentRouter.delete(
  "/:postId/:commentId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Comment.findById(req.params.commentId)
      .then((comment) => {
        if (comment.author.equals(req.user._id)) {
          Comment.findByIdAndRemove(req.params.commentId)
            .then((comment) => {
              res.status(200).json(comment);
            })
            .catch((err) =>
              res.status(400).json({ delete: "Error deleting the comment" })
            );
        } else {
          res.status(400).json({ error: "You are not authenticated" });
        }
      })
      .catch((err) =>
        res.status(400).json({ error: "You are not authenticated" })
      );
  }
);

module.exports = commentRouter;
