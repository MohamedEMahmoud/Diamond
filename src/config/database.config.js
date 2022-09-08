const mongoose = require('mongoose');

module.exports = async () => {
	const connectDB = await mongoose.connect(`${process.env.MONGO_URI}`);
	if (!connectDB) {
		throw new Error('Could not connect to MongoDB');
	}
	console.log('Connecting to MongoDB');
};
