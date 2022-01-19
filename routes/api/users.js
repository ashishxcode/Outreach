const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const dotenv = require('dotenv');
dotenv.config();


const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
	'/',
	check('name', 'Name is required').notEmpty(),
	check('email', 'Please include a valid email').isEmail(),
	check(
		'password',
		'Please enter a password with 6 or more characters',
	).isLength({ min: 6 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		//@desc: Creating user using register route
		//@input: name, email, password
		//@output: JWT token for user (with expiry)
		try {
			// Checking if user already exists
			let user = await User.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}

			// Getting user's gravatar from email id
			const avatar = normalize(
				gravatar.url(email, {
					s: '200',
					r: 'pg',
					d: 'mm',
				}),
				{ forceHttps: true },
			);

			// Creating user object
			user = new User({
				name,
				email,
				avatar,
				password,
			});

			// Creating the secret key for the JWT
			const salt = await bcrypt.genSalt(10);

			// Hashing the password
			user.password = await bcrypt.hash(password, salt);

			// Saving the user
			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			// Creating the JWT token
			jwt.sign(
				payload,
				process.env.JWT_SECRET,
				{ expiresIn: '5 days' },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				},
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	},
);

module.exports = router;
