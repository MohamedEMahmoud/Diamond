const CustomError = require('./CustomError');

class NotFoundError extends CustomError {
	constructor() {
		super('Route Not Found!');
		this.statusCode = 404;
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}

	serializerErrors() {
		return [{ status: this.statusCode, message: this.message, success: false }];
	}
}

module.exports = NotFoundError;
