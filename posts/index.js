const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const postId = randomBytes(4).toString("hex");
  const { title } = req.body;

  const newPost = { id: postId, title };
  posts[postId] = newPost;

  await axios
    .post("http://event-bus-srv:4005/events", {
      type: "PostCreated",
      data: newPost,
    })
    .catch((e) => console.log("error: ", e));
  res.status(201).send(posts[postId]);
});

app.post("/events", (req, res) => {
  console.log("Event received:", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("hello from v3");
  console.log("app is listening on port 4000");
});
