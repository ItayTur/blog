const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.listen(4002, () => {
  console.log("Listening on 4002");
});
