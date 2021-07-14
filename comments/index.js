const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const comments = commentsByPostId[req.params.id] || [];
  const newComment = { id: commentId, content: req.body.content };
  comments.push(newComment);
  await axios
    .post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: { ...newComment, postId: req.params.id },
    })
    .catch((e) => console.log("error"));
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Event received:", req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log("listening on 4001");
});
