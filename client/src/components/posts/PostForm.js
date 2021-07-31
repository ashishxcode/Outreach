import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { FiImage } from 'react-icons/fi';

const PostForm = ({ addPost }) => {
	const [text, setText] = useState('');
	const [image, setImage] = useState(null);

	const handleImageUpload = (e) => {
		console.log('Image upload clicked', e);
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
					required></textarea>

				<div className="form-action  my-1">
					<div className="image-upload">
						<label for="file-input">
							<FiImage className="upload-icon" />
						</label>
						<input
							id="file-input"
							type="file"
							onChange={handleImageUpload}
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
