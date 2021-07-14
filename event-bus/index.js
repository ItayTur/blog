const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const { body: event } = req;
  await axios.post("http://localhost:4000/events", event);
  await axios.post("http://localhost:4001/events", event);
  await axios.post("http://localhost:4002/events", event);

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("listening on 4005");
});
