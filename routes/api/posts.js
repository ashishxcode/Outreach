const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
	'/',
	auth,
	check('text', 'Text is required').notEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//@desc - Create a new post with user id,name,avatar
		//@input - text,userId
		//@output -  post{text,name,avatar,userId}
		try {
			// Getting user object except password
			const user = await User.findById(req.user.id).select('-password');

			const newPost = new Post({
				text: req.body.text,
				images: req.body.images,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			});

			const post = await newPost.save();

			res.json(post);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	},
);

// @route    GET api/posts
// @desc     Get all posts (Based on time)
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
	//@desc - Getting the post using postId
	//@input - postId
	//@output -  post object
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		res.json(post);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
	//@desc - Delete a comment using comment id
	//@input - Post id
	//@output - message post removed

	try {
		const post = await Post.findById(req.params.id);

		// Finding post using post id
		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		// Check if user is the author of the post
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		await post.remove();
		res.json({ msg: 'Post removed' });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

// @route    PUT api/posts/like/:id
// @desc     Like a post and return the number of likes
// @access   Private
router.put('/like/:id', auth, checkObjectId('id'), async (req, res) => {
	//@desc - Like a post and add userId into post.likes array
	//@input - userId
	//@output - post.like array with added userId

	try {
		const post = await Post.findById(req.params.id);

		// Checking is userId exits in post.likes array
		if (post.likes.some((like) => like.user.toString() === req.user.id)) {
			return res.status(400).json({ msg: 'Post already liked' });
		}

		// Adding userID into post.likes array
		post.likes.unshift({ user: req.user.id });

		await post.save();

		return res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post and return the number of likes
// @access   Private
router.put('/unlike/:id', auth, checkObjectId('id'), async (req, res) => {
	//@desc - Unlike a post and remove userId from post.likes array
	//@input - userId
	//@output - post.like array with removed userId
	try {
		const post = await Post.findById(req.params.id);

		// Checking is userId exits in post.likes array
		if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
			return res.status(400).json({ msg: 'Post has not yet been liked' });
		}

		// Remove the userId from post.likes array
		post.likes = post.likes.filter(
			({ user }) => user.toString() !== req.user.id,
		);

		await post.save();

		return res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
	'/comment/:id',
	auth,
	checkObjectId('id'),
	check('text', 'Text is required').notEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//@desc - Creating comment and adding in post.comment array
		//@input - text for comment and userId
		//@output - comment{text,name,avatar,userId}
		try {
			// Getting user object except password
			const user = await User.findById(req.user.id).select('-password');
			const post = await Post.findById(req.params.id);

			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			};

			post.comments.unshift(newComment);

			await post.save();

			res.json(post.comments);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	},
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
	//@desc - Delete a comment using comment id
	//@input - commnt id
	//@output - post with deleted comment array
	try {
		const post = await Post.findById(req.params.id);

		// Getting comment using comment id
		const comment = post.comments.find(
			(comment) => comment.id === req.params.comment_id,
		);
		// Make sure comment exists
		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}
		// Make sure user is the author of the comment
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		post.comments = post.comments.filter(
			({ id }) => id !== req.params.comment_id,
		);

		await post.save();

		return res.json(post.comments);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

module.exports = router;
