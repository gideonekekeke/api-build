require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 4000;
const DB_ONLINE =
  "mongodb+srv://giddy:BqGOcPI8FD0DL2K7@cluster0.7rupp.mongodb.net/buildapiDB?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(DB_ONLINE, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected🚀");
  })
  .catch(() => {
    console.log("cannot connect 🚫");
  });

app.get("/", (req, res) => {
  res.json("my api is ready to work");
});

app.use("/api", require("./Route/Router"));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
