import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { ImBubble, ImHeart, ImHeartBroken } from 'react-icons/im';
import 'antd/dist/antd.css';
import { Image } from 'antd';
const PostItem = ({
	addLike,
	removeLike,
	deletePost,
	auth,
	post: { _id, text, images, name, avatar, user, likes, comments, date },
	showActions,
}) => (
	<div className="post card bg-white p-1 my-1">
		<div>
			<Link
				to={`/profile/${user}`}
				className="post-header"
				title="View Profile">
				<img className="post-profile" src={avatar} alt="" />
				<div class="post-user">
					<h4 className="post-username">{name}</h4>
					<p className="post-date">Posted on {formatDate(date)}</p>
				</div>
			</Link>
		</div>
		<div>
			<p className="my-1">{text}</p>
			{images &&
				images.map((image) => (
					<div key={image.public_id}>
						<Image
							width={200}
							src={image.url}
							preview={{
								src: image.url,
							}}
						/>
					</div>
				))}
			{showActions && (
				<div className="post-action">
					<button
						onClick={() => addLike(_id)}
						type="button"
						title="Like"
						className="btn btn-light">
						<ImHeart className="react-icons" />
						{'  '}
						<span>
							{likes.length > 0 && <span>{likes.length}</span>}
						</span>
					</button>
					<button
						onClick={() => removeLike(_id)}
						type="button"
						title="Unlike"
						className="btn btn-light">
						<ImHeartBroken className="react-icons" />{' '}
					</button>
					<Link to={`/posts/${_id}`} title="Comment">
						<button className="btn ">
							<ImBubble className="react-icons" />{' '}
							{comments.length > 0 && (
								<span>{comments.length}</span>
							)}
						</button>
					</Link>
					{!auth.loading && user === auth.user._id && (
						<button
							onClick={() => deletePost(_id)}
							type="button"
							title="Delete"
							className="btn btn-danger">
							<i className="fas fa-times" />
						</button>
					)}
				</div>
			)}
		</div>
	</div>
);

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
