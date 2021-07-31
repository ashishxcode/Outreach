const express = require("express");
const router = express.Router();

//middlewares
const auth = require("../../middleware/auth");

//controllers
const {
	uploadImage,
	removeImage,
} = require("../../Controllers/cloudinaryController");

//routes
//image uplaod
router.post("/", auth, uploadImage);

router.post("/removeImage", auth, removeImage);
module.exports = router;
