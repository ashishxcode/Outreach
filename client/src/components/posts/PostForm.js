import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import { FiImage } from "react-icons/fi";
import Resizer from "react-image-file-resizer";
import api from "../../utils/api";
import "antd/dist/antd.css";
import { Badge } from "antd";
import { FiX } from "react-icons/fi";
import ReactQuill from "react-quill";
//react-quill css files
import "react-quill/dist/quill.snow.css";

const PostForm = ({ addPost }) => {
	const [text, setText] = useState("");
	const [images, setImages] = useState([]);
	// const [imageURL, setImageURL] = useState();
	// const [imageId, setImageId] = useState();

	const handleimageResizeAndUpload = (e) => {
		const filesUploaded = [];

		//resize: use resize react file npm : npm i react-image-file-resizer
		//for a single file : e.target.files[0]
		//buty for multiple uploads , we need to loop through the arrys of file lists

		let files = e.target.files;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					300,
					300,
					"WEBP",
					100,
					0,
					(uri) => {
						//the calback dunction : most important
						console.log("uri ===> ", uri);
						api
							.post("http://localhost:5000/api/imagesUpload/", {
								image: uri,
							})
							.then((res) => {
								filesUploaded.push(res.data);
								setImages(filesUploaded);
								console.log("filesUploaded --> ", filesUploaded);
							})
							.catch((err) => {
								console.log(err.message);
							});

						//make request to backend with images
					},
					"base64"
				);
			}
		}
	};

	const handleDeleteImage = (public_id) => {
		console.log("delete click", public_id);
		api
			.post("http://localhost:5000/api/imagesUpload/removeImage", {
				public_id,
			})
			.then((res) => {
				let filteredImages = images.filter((item) => {
					return item.public_id !== public_id;
				});
				setImages(filteredImages);
			});
	};
	return (
		<div className="post-form">
			<form
				className="form my-1"
				onSubmit={(e) => {
					e.preventDefault();
					addPost({ text, images });
					setText("");
					setImages([]);
				}}
			>
				<ReactQuill theme="snow" value={text} onChange={setText} />
				{images && images.length
					? images.map((image) => {
							return (
								<div className="thumbnail-container">
									<Badge
										count={<FiX className="badge-icon" />}
										onClick={() => {
											handleDeleteImage(image.public_id);
										}}
										style={{ cursor: "pointer" }}
										id={image.public_id}
									>
										<img src={image.url} alt="" className="image-thumbnail" />
									</Badge>
								</div>
							);
					  })
					: ""}
				<div className="form-action  my-1">
					<div className="image-upload">
						<label htmlFor="file-input">
							<FiImage className="upload-icon" />
						</label>
						<input
							id="file-input"
							type="file"
							accept=".png, .jpg, .jpeg"
							onChange={handleimageResizeAndUpload}
						/>
					</div>
					<input type="submit" className="btn btn-dark" value="Submit" />
				</div>
			</form>
		</div>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
