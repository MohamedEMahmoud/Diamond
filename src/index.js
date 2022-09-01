require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

(async () => {
	const connectDB = await mongoose.connect(`${process.env.MONGO_URI}`);
	if (!connectDB) {
		throw new Error('Could not connect to MongoDB');
	}
	console.log('Connecting to MongoDB');

	const port = process.env.PORT || 8000;

	const server = app.listen(port, () =>
		console.log(`Listening on port ${port}`)
	);

	process.on('unhandledRejection', (err) => {
		console.log(err);
		console.log(`Unhandled rejection: ${err.name} | ${err.message}`);
		server.close(() => {
			console.log('application shut down');
			process.exit(1);
		});
	});
})();
