import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { ImBubble, ImHeart, ImHeartBroken } from 'react-icons/im';
import 'antd/dist/antd.css';
import { Menu, Dropdown, message } from 'antd';
import { GoKebabHorizontal } from 'react-icons/go';

const PostItem = ({
	addLike,
	removeLike,
	deletePost,
	auth,
	post: { _id, text, images, name, avatar, user, likes, comments, date },
	showActions,
}) => {
	const menu = (
		<Menu>
			{!auth.loading && user === auth.user._id && (
				<Menu.Item danger>
					<span
						onClick={() => {
							deletePost(_id);
							message.success(`Post Deleted`);
						}}
						type="button"
						title="Delete">
						Delete Post
					</span>
				</Menu.Item>
			)}
			<Menu.Item>
				<span
					onClick={() => {
						message.success(`Post Reported`);
					}}>
					Report Post
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
				{images &&
					images.map((image) => (
						<div
							className="post-image-wrapper"
							key={image.public_id}>
							<img
								className="post-image"
								src={image.url}
								alt=""
							/>
						</div>
					))}
				{showActions && (
					<div className="post-action">
						<span
							className="post-button"
							onClick={() => addLike(_id)}
							type="button"
							title="Like">
							<ImHeart className="react-icons" />
							<span className="button-value">
								{likes.length > 0 && (
									<span>{likes.length}</span>
								)}
							</span>
						</span>
						<span
							className="post-button"
							onClick={() => removeLike(_id)}
							type="button"
							title="Unlike">
							<ImHeartBroken className="react-icons" />
						</span>
						<Link to={`/posts/${_id}`} title="Comment">
							<span className="post-button">
								<ImBubble className="react-icons" />
								{comments.length > 0 && (
									<span className="button-value">
										{comments.length}
									</span>
								)}
							</span>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

PostItem.defaultProps = {
	showActions: true,
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
	showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
	PostItem,
);
