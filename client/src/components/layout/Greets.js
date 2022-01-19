import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Greets = ({ auth: { user } }) => {
	const greet = () => {
		var today = new Date();
		var curHr = today.getHours();

		if (curHr < 12) {
			return 'Good morning';
		} else if (curHr < 18) {
			return 'Good afternoon';
		} else {
			return 'Good evening';
		}
	};
	return (
		<p className="lead">
			<strong>{`${greet()}, ${
				user && user.name.trim().split(' ')[0]
			}.`}</strong>
		</p>
	);
};

Greets.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps, {})(Greets);
