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
  console.log("hello from CommentCreated, id: ", req.params.id);
  const newComment = {
    id: commentId,
    content: req.body.content,
    status: "pending",
  };
  comments.push(newComment);
  commentsByPostId[req.params.id] = comments;
  await axios
    .post("http://event-bus-srv:4005/events", {
      type: "CommentCreated",
      data: { ...newComment, postId: req.params.id },
    })
    .catch((e) => console.log("error"));
  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { id, postId, status, content } = data;
    console.log(
      "hello from comments, CommentModerated, status:",
      status,
      commentsByPostId,
      postId
    );
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    await axios
      .post("http://event-bus-srv:4005/events", {
        type: "CommentUpdated",
        data: {
          id,
          postId,
          status,
          content,
        },
      })
      .catch((e) => console.log("error: ", error.message));
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("listening on 4001");
});
