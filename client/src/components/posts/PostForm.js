import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { FiImage } from 'react-icons/fi';
import Resizer from 'react-image-file-resizer';
import api from '../../utils/api';
import { Badge } from 'antd';
import { AiOutlineDelete } from 'react-icons/ai';

const PostForm = ({ addPost }) => {
	const [text, setText] = useState('');
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
					200,
					200,
					'JPEG',
					100,
					0,
					(uri) => {
						//the calback dunction : most important
						console.log('uri ===> ', uri);
						api.post('http://localhost:5000/api/imagesUpload/', {
							image: uri,
						})
							.then((res) => {
								console.log(
									'res from images ==>',
									res.data.url,
									// setImageURL(res.data.url)
								);

								filesUploaded.push(res.data);
								setImages(filesUploaded);
								console.log(
									'filesUploaded ===> ',
									filesUploaded,
								);
							})
							.catch((err) => {
								console.log(err.message);
							});

						//make request to backend with images
					},
					'base64',
				);
			}
		}
	};

	const handleDeleteImage = (public_id) => {
		console.log('delete click', public_id);
		api.post('http://localhost:5000/api/imagesUpload/removeImage', {
			public_id,
		}).then((res) => {
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
					addPost({ text });
					setText('');
				}}>
				<textarea
					name="text"
					cols="30"
					rows="5"
					placeholder="What is in your mind?"
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
				/>
				{images && images.length
					? images.map((image) => {
							return (
								<Badge
									count="❌"
									onClick={() => {
										handleDeleteImage(image.public_id);
									}}
									offset={[0, 10]}
									style={{ cursor: 'pointer' }}
									id={image.public_id}>
									<img
										src={image.url}
										className="image-thumbnail"
										alt=""
									/>
								</Badge>
							);
					  })
					: ''}
				<div className="form-action  my-1">
					<div className="image-upload">
						<label for="file-input">
							<FiImage className="upload-icon" />
						</label>
						<input
							id="file-input"
							type="file"
							accept=".png, .jpg, .jpeg"
							onChange={handleimageResizeAndUpload}
						/>
					</div>
					<input
						type="submit"
						className="btn btn-dark"
						value="Submit"
					/>
				</div>
			</form>
		</div>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
