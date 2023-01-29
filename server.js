const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/imagesUpload/', require('./routes/api/cloudinaryUpload'));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
	// Step 1:
	app.use(express.static(path.resolve(__dirname, './client/build')));
	// Step 2:
	app.get('*', function (request, response) {
		response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
	});
} else {
	// Step 1:
	app.use(express.static(path.resolve(__dirname, './client/public')));
	// Step 2:
	app.get('*', function (request, response) {
		response.sendFile(path.resolve(__dirname, './client/public', 'index.html'));
	});
}

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
	console.log(`MongoURI -> ${process.env.MONGO_URL}`);
});
