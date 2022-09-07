const CustomError = require('./CustomError');

class NotFoundError extends CustomError {
	constructor(message) {
		super(message);
		this.statusCode = 404;
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}

	serializerErrors() {
		return [{ status: this.statusCode, message: this.message, success: false }];
	}
}

module.exports = NotFoundError;
