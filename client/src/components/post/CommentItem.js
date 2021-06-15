import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import formatDate from "../../utils/formatDate";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => (
  <div className='post card bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`} className='post-header'>
        <img className='post-profile' src={avatar} alt='' />
        <div class='post-user'>
          <h4 className='post-username'>{name}</h4>
          <p className='post-date'>Posted on {formatDate(date)}</p>
        </div>
      </Link>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deleteComment(postId, _id)}
          type='button'
          className='btn btn-danger'>
          Delete
        </button>
      )}
    </div>
  </div>
);

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
