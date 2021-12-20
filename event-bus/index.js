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
    .catch((e) => console.log("error on event posts")); // posts
  // await axios
  //   .post("http://localhost:4001/events", event)
  //   .catch((e) => console.log("error on event comments")); // comments
  // await axios
  //   .post("http://localhost:4002/events", event)
  //   .catch((e) => console.log("error on event query")); // query
  // await axios
  //   .post("http://localhost:4003/events", event)
  //   .catch((e) => console.log("error on event moderation")); // moderation

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("listening on 4005");
});
