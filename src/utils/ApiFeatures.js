class ApiFeatures {
	constructor(mongooseQuery, queryString) {
		this.mongooseQuery = mongooseQuery;
		this.queryString = queryString;
	}

	filter() {
		// Filtering
		const queryStringObj = { ...this.queryString };
		const excludesFields = ['page', 'limit', 'sort', 'fields'];
		excludesFields.forEach((field) => delete queryStringObj[field]);

		//Apply filtering using [gte, gt, lte, lt]
		let queryStr = JSON.stringify(queryStringObj);
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
		this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
		return this;
	}

	sort() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(',').join(' ');
			this.mongooseQuery = this.mongooseQuery.sort(sortBy);
		} else {
			this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
		}
		return this;
	}

	limitFields() {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(',').join(' ');
			this.mongooseQuery = this.mongooseQuery.select(fields);
		}
	}

	search() {
		if (this.queryString.keyword) {
			let query = {};
			console.log(this.mongooseQuery.mongooseCollection.name);
			if (this.mongooseQuery.mongooseCollection.name === 'product') {
				query.$or = [
					{ title: this.queryString.keyword, $options: 'i' },
					{ description: this.queryString.description, $options: 'i' },
				];
			} else {
				query = { name: { $regex: this.queryString.keyword, $options: 'i' } };
			}

			this.mongooseQuery = this.mongooseQuery.find(query);
		}

		return this;
	}

	paginate(documentsCount) {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 5;
		const skip = (page - 1) * limit;
		const endIndex = page * limit;

		const pagination = {};
		pagination.page = page;
		pagination.limit = limit;
		pagination.numberOfPages = Math.ceil(limit / skip);

		if (endIndex < documentsCount) {
			pagination.next = page + 1;
		}

		if (skip > 0) {
			pagination.prev = page - 1;
		}

		this.paginationResults = pagination;
		this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
		return this;
	}
}

module.exports = ApiFeatures;
