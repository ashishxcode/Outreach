//install an drequire cloudinary
const cloudinary = require("cloudinary");

//config
cloudinary.config({
	cloud_name: "thexoutreach",
	api_key: "311713678896262",
	api_secret: "9peSsYR-LMhVUCp_otxlyPUpWjo",
});

exports.uploadImage = async (req, res) => {
	let result = await cloudinary.uploader.upload(req.body.image, {
		public_id: `${Date.now()}`, // public id is visible to public whenwe retrive the data
		resource_type: "auto", // auto : all file type : jpeg/png
	});

	//send response
    res.json({
        public_id = result.public_id,
        url : result.secure_url,
    })
};
