const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const postId = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[postId] = { id: postId, title };

  res.status(201).send(posts[postId]);
});

app.listen(4000, () => {
  console.log("app is listening on port 4000");
});
