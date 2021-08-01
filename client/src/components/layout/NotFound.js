import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImg from '../../img/not-found.svg';

const NotFound = () => {
	return (
		<div className="not-found">
			<img className="not-found-img m" src={notFoundImg} alt="" />
			<strong className="large text-primary">Oops!</strong>
			<strong>We can't seem to find the page you're looking for</strong>

			<strong className="m text-danger">Error code: 404</strong>
			<Link to="/" className="btn btn-outline m-2">
				Back to Home
			</Link>
		</div>
	);
};

export default NotFound;
