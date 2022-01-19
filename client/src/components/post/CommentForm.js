import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import ReactQuill from 'react-quill';
//react-quill css files
import 'react-quill/dist/quill.snow.css';

const CommentForm = ({ postId, addComment }) => {
	const [text, setText] = useState('');

	return (
		<div className="post-form ">
			<strong>Leave a Comment</strong>
			<form
				className="form my-1"
				onSubmit={(e) => {
					e.preventDefault();
					addComment(postId, { text });
					setText('');
				}}>
				<ReactQuill theme="snow" value={text} onChange={setText} />
				<input
					type="submit"
					className="btn btn-dark my-1"
					value="Submit"
				/>
			</form>
		</div>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
