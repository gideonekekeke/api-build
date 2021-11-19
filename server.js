const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;

const app = express();

app.get("/", (req, res) => {
  res.json("my api is ready to work");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
