import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
	profile: {
		user: { _id, name, avatar },
		status,
		company,
		bio,
	},
}) => {
	return (
		<div className="profile card bg-light">
			<img src={avatar} alt="" className="profile-img" />
			<div>
				<h4 className="profile-name">{name}</h4>
				<p className="profile-status ">{status}</p>
				<p className="my-1 profile-bio">{bio && <span>{bio}</span>}</p>
			</div>

			<Link to={`/profile/${_id}`} className="btn btn-outline">
				View Profile
			</Link>
		</div>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileItem;
