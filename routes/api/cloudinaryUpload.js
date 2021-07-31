const express = require("express");
const router = express.Router();

//middlewares
const auth = require("../../middleware/auth");

//controllers
const { uploadImage } = require("../../Controllers/cloudinaryController");

//routes
//image uplaod
router.post("/imagesUpload", auth, uploadImage);

module.exports = router;
