import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import {
	HiUser,
	HiLogout,
	HiCollection,
	HiViewGrid,
	HiLogin,
	HiDocumentText,
} from 'react-icons/hi';
import logo from '../../img/logo.svg';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<Fragment>
			<Link className="nav-link" to="/profiles">
				<HiViewGrid className="react-icons nav-icons" />
				{'  '}
				<span className="hide-sm">Developers</span>
			</Link>

			<Link className="nav-link" to="/posts">
				<HiCollection className="react-icons  nav-icons" />
				{'  '}
				<span className="hide-sm">Posts</span>
			</Link>
			<Link className="nav-link" to="/dashboard">
				<HiUser className="react-icons  nav-icons" />
				{'  '}
				<span className="hide-sm">Dashboard</span>
			</Link>

			<Link className="nav-link" href="#!" to="/" onClick={logout}>
				<HiLogout className="react-icons  nav-icons" />
				{'  '}
				<span className="hide-sm">Logout</span>
			</Link>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<Link className="nav-link" to="/profiles">
				<HiViewGrid className="react-icons nav-icons" />
				{'  '}
				<span className="hide-sm">Developers</span>
			</Link>

			<Link className="nav-link" to="/login">
				<HiLogin className="react-icons nav-icons" />
				{'  '}
				<span className="hide-sm">Login</span>
			</Link>
			<Link className="nav-link" to="/register">
				<HiDocumentText className="react-icons nav-icons" />
				{'  '}
				<span className="hide-sm">Register</span>
			</Link>
		</Fragment>
	);

	return (
		<nav className="navbar">
			<div className="nav-brand">
				<Link className="nav-link" to="/">
					<img src={logo} alt="" className="brand-logo" />
				</Link>
			</div>
			<div className="nav">
				<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
			</div>
		</nav>
	);
};

Navbar.prototype = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
