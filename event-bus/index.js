const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const events = [];

app.post("/events", async (req, res) => {
  const { body: event } = req;
  events.push(event);
  await axios
    .post("http://posts-clusterip-srv:4000/events", event)
    .catch((e) => console.log("error on event posts", e)); // posts
  console.log("passed posts");
  await axios
    .post("http://comments-srv:4001/events", event)
    .catch((e) => console.log("error on event comments", e)); // comments
  console.log("passed comments");
  await axios
    .post("http://query-srv:4002/events", event)
    .catch((e) => console.log("error on event query", e)); // query
  console.log("passed query");
  await axios
    .post("http://moderation-srv:4003/events", event)
    .catch((e) => console.log("error on event moderation", e)); // moderation
  console.log("passed moderation");

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("listening on 4005");
});
