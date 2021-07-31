//install an drequire cloudinary
const cloudinary = require("cloudinary");

//config
cloudinary.config({
	cloud_name: "thexoutreach",
	api_key: "311713678896262",
	api_secret: "9peSsYR-LMhVUCp_otxlyPUpWjo",
});

exports.uploadImage = async (req, res) => {
	console.log("IGetting the response, HELLO ASHISH!!");

	console.log("REQ BODY FROM IMAGE", req);
	let result = await cloudinary.uploader.upload(req.body.image, {
		public_id: `${Date.now()}`, // public id is visible to public whenwe retrive the data
		resource_type: "auto", // auto : all file type : jpeg/png
	});

	//send response
	res.json({
		public_id: result.public_id,
		url: result.secure_url,
	});
};

//remove Image From cloudinary
exports.removeImage = async (req, res) => {
	let image_id = req.body.public_id;

	cloudinary.uploader.destroy(image_id, (err, result) => {
		if (err) return res.json({ success: false, err });
		res.send({ ok: true });
	});
};
