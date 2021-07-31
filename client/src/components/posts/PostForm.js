import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import { FiImage } from "react-icons/fi";
import { axios } from "axios";
import Resizer from "react-image-file-resizer";
import api from "../utils/api";

const PostForm = ({ addPost }) => {
	const [text, setText] = useState("");
	const [images, setImages] = useState([]);

	const handleimageResizeAndUpload = (e) => {
		const filesUploaded = images;

		//resize: use resize react file npm : npm i react-image-file-resizer
		//for a single file : e.target.files[0]
		//buty for multiple uploads , we need to loop through the arrys of file lists

		let files = e.target.files;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					200,
					200,
					"JPEG",
					100,
					0,
					(uri) => {
						//the calback dunction : most important
						console.log("uri ===> ", uri);
						api
							.post("http://localhost:8000/api/imagesUpload", {
								image: uri,
							})
							.then((res) => {
								console.log("res from images ==>", res);

								filesUploaded.push(res.data);
								setImages(filesUploaded);
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

	return (
		<div className="post-form">
			<form
				className="form my-1"
				onSubmit={(e) => {
					e.preventDefault();
					addPost({ text });
					setText("");
				}}
			>
				<textarea
					name="text"
					cols="30"
					rows="5"
					placeholder="What is in your mind?"
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
				></textarea>

				<div className="form-action  my-1">
					<div className="image-upload">
						<label for="file-input">
							<FiImage className="upload-icon" />
						</label>
						<input
							id="file-input"
							type="file"
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
