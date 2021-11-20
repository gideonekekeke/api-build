const mongoose = require("mongoose");

const mySchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  picture: {
    type: String,
  },

  picID: {
    type: String,
  },
});

module.exports = mongoose.model("blog", mySchema);
