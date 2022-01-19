import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteComment } from '../../actions/post';
import 'antd/dist/antd.css';
import { Menu, Dropdown, message } from 'antd';
import { GoKebabHorizontal } from 'react-icons/go';

const CommentItem = ({
	postId,
	comment: { _id, text, name, avatar, user, date },
	auth,
	deleteComment,
}) => {
	const menu = (
		<Menu>
			{!auth.loading && user === auth.user._id && (
				<Menu.Item danger>
					<span
						onClick={() => {
							deleteComment(postId, _id);
							message.success(`Comment Deleted`);
						}}
						type="button"
						title="Delete">
						Delete Comment
					</span>
				</Menu.Item>
			)}
			<Menu.Item>
				<span
					onClick={() => {
						message.success(`Comment Reported`);
					}}>
					Report Comment
				</span>
			</Menu.Item>
		</Menu>
	);

	return (
		<div className="post card bg-white p-1 my-1">
			<div className="post-header">
				<Link
					to={`/profile/${user}`}
					title="View Profile"
					className="post-info">
					<img className="post-profile" src={avatar} alt="" />
					<div className="post-user">
						<h4 className="post-username">{name}</h4>
						<p className="post-date">
							Posted on {formatDate(date)}
						</p>
					</div>
				</Link>
				<span>
					<Dropdown overlay={menu}>
						<GoKebabHorizontal
							className="ant-dropdown-link"
							onClick={(e) => e.preventDefault()}
						/>
					</Dropdown>
				</span>
			</div>
			<div class="post-content">
				<div
					className="my"
					dangerouslySetInnerHTML={{ __html: text }}
				/>
			</div>
		</div>
	);
};

CommentItem.propTypes = {
	postId: PropTypes.string.isRequired,
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
