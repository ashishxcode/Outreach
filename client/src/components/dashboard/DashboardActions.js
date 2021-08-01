import React from 'react';
import { Link } from 'react-router-dom';
import { HiAcademicCap, HiBriefcase, HiUser } from 'react-icons/hi';

const DashboardAction = () => {
	return (
		<div className="dash-buttons">
			<Link to="/edit-profile" className="btn btn-light">
				<HiUser className="text-primary react-icons" />
				{'  '}
				<span>Edit Profile</span>
			</Link>
			<Link to="/add-experience" className="btn btn-light">
				<HiBriefcase className="text-primary react-icons" />
				{'  '}
				<span>Add Experience</span>
			</Link>
			<Link to="/add-education" className="btn btn-light">
				<HiAcademicCap className="text-primary react-icons" />
				{'  '}
				<span>Add Education</span>
			</Link>
		</div>
	);
};

export default DashboardAction;
