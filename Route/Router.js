const express = require("express");
const router = express.Router();
const blog = require("../Model/ModelSchema");
const cloudinary = require("cloudinary");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imageUpload = multer({ storage });

cloudinary.config({
  cloud_name: "giddy",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

//getting all the files
router.get("/blogs", async (req, res) => {
  const AllData = await blog.find();
  try {
    res.status(200).json({
      message: "Succefull 💻 ",
      data: AllData,
    });
  } catch (error) {
    res.status(404).json({
      message: "getting all data failed 😣",
      data: AllData,
    });
  }
});

//getting a files by id
router.get("/blog/:id", async (req, res) => {
  const gettingId = await blog.findById(req.params.id);
  try {
    res.status(200).json({
      message: "Succefull 💻",
      data: gettingId,
    });
  } catch (error) {
    res.status(404).json({
      message: "getting all data failed 😣",
      data: gettingId,
    });
  }
});

router.post("/blog", imageUpload.single("picture"), async (req, res) => {
  const usingCloudinary = await cloudinary.uploader.upload(req.file.path);
  console.log(usingCloudinary);
  const SendingData = await blog.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    picture: usingCloudinary.secure_url,
    picID: usingCloudinary.public_id,
  });

  try {
    res.status(201).json({
      message: "Succefull 💻",
      data: SendingData,
    });
  } catch (error) {
    res.status(404).json({
      message: "getting all data failed 😣",
      data: SendingData,
    });
  }
});

router.patch("/blog/:id", imageUpload.single("picture"), async (req, res) => {
  const usingCloudinary = await cloudinary.uploader.upload(req.file.path);
  console.log(usingCloudinary);
  const EditingUser = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    picture: usingCloudinary.secure_url,
    picID: usingCloudinary.public_id,
  };
  try {
    const updated = await blog.findByIdAndUpdate(req.params.id, EditingUser);
    res.status(200).json({
      message: "Succefull 💻",
      data: updated,
    });
  } catch (error) {
    res.status(404).json({
      message: "getting all data failed 😣",
      data: updated,
    });
  }
});

router.delete("/blog/:id", async (req, res) => {
  const deleteUser = await blog.findByIdAndRemove(req.params.id, req.body);
  try {
    res.status(201).json({
      message: "Succefull 💻",
      data: deleteUser,
    });
  } catch (error) {
    res.status(404).json({
      message: "getting all data failed 😣",
      data: deleteUser,
    });
  }
});

module.exports = router;
