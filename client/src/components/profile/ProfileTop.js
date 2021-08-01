import React from 'react';
import PropTypes from 'prop-types';
import { RiMapPinLine, RiLinksFill } from 'react-icons/ri';

const ProfileTop = ({
	profile: {
		status,
		company,
		location,
		website,
		social,

		user: { name, avatar },
	},
}) => {
	return (
		<div className="profile-top">
			<div className="profile-cover"></div>
			<img className="profile-img my-1" src={avatar} alt="" />
			<h1 className="large">{name}</h1>
			<p className="lead">
				{status} {company ? <span> at {company}</span> : null}
			</p>
			<div>
				<span>
					{location ? (
						<span>
							<RiMapPinLine className="react-icons" />{' '}
							<span>{location}</span>
						</span>
					) : null}
				</span>
				{' | '}
				{website ? (
					<a href={website} target="_blank" rel="noopener noreferrer">
						<RiLinksFill className="react-icons" />{' '}
						<span>{website}</span>
					</a>
				) : null}
			</div>
			<div className="icons my-1">
				{social
					? Object.entries(social)
							.filter(([_, value]) => value)
							.map(([key, value]) => (
								<a
									key={key}
									href={value}
									target="_blank"
									rel="noopener noreferrer">
									<i className={`fab fa-${key} fa-2x`}></i>
								</a>
							))
					: null}
			</div>
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileTop;
