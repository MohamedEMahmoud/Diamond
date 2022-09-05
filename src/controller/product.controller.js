const slugify = require('slug');
const asyncHandler = require('express-async-handler');
const Product = require('../models/product.model');
const BadRequestError = require('../utils/errors/BadRequestError');
const ApiFeatures = require('../utils/ApiFeatures');

// @desc    Create product
// @route   POST  /api/v1/product
// @access  Private/Admin-Manager
exports.createProduct = asyncHandler(async (req, res) => {
	req.body.slug = slugify(req.body.title);
	const product = new Product(req.body);

	await product.save();
	await product.populate([
		{ path: 'category', model: 'Category' },
		{ path: 'subCategory', model: 'SubCategory' },
	]);
	res.status(201).send({ product, success: true });
});

// @desc    get  specific product
// @route   get  /api/v1/product/:id
// @access  public
exports.getProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const product = await Product.findOne({ id }).populate([
		{ path: 'category', model: 'Category' },
		{ path: 'subCategory', model: 'SubCategory' },
	]);
	if (!product) {
		throw new BadRequestError('Product not found');
	}

	res.status(200).send({ product, success: true });
});

// @desc    get  products
// @route   get  /api/v1/products
// @access  public
exports.getProducts = asyncHandler(async (req, res) => {
	// // Filtering
	// const queryStringObj = { ...req.query };
	// const excludesFields = ['page', 'limit', 'sort', 'fields'];
	// excludesFields.forEach((field) => delete queryStringObj[field]);

	// //Apply filtering using [gte, gt, lte, lt]
	// let queryStr = JSON.stringify(queryStringObj);
	// queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

	// // pagination
	// const page = req.query.page * 1 || 1;
	// const limit = req.query.limit * 1 || 5;
	// const skip = (page - 1) * limit;

	// let products = await Product.find(JSON.parse(queryStr))
	// 	.skip(skip)
	// 	.limit(limit)
	// 	.populate([
	// 		{ path: 'category', model: 'Category' },
	// 		{ path: 'subCategory', model: 'SubCategory' },
	// 	]);

	// // throw Error if no products
	// if (!products.length) {
	// 	throw new BadRequestError('Products not found');
	// }

	// // sorting
	// if (req.query.sort) {
	// 	const sortBy = req.query.sort.split(',').join(' ');
	// 	products = products.sort(sortBy);
	// } else {
	// 	products = products.sort('-createdAt');
	// }

	// // fields limiting
	// if (req.query.fields) {
	// 	const fields = req.query.fields.split(',').join(' ');
	// 	products = products.select(fields);
	// }

	// // search
	// if (req.query.keyword) {
	// 	const query = {};

	// 	query.$or = [
	// 		{ title: req.query.keyword, $options: 'i' },
	// 		{ description: req.query.description, $options: 'i' },
	// 	];

	// 	products = products.find(query);
	// }
	const documentsCount = Product.countDocuments();
	const apiFeatures = new ApiFeatures(Product.find({}), req.query)
		.filter()
		.sort()
		.limitFields()
		.search()
		.paginate(documentsCount);

	const { paginationResults, mongooseQuery } = apiFeatures;
	const products = await mongooseQuery;

	res.status(200).send({
		results: products.length,
		data: {
			paginationResults,
			products,
		},
		success: true,
	});
});

// @desc    update  product
// @route   patch  /api/v1/product/:id
// @access  private Admin-Manager
exports.updateProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const product = await Product.findOneAndUpdate(
		{
			id,
		},
		req.body,
		{
			new: true,
		}
	).populate([
		{ path: 'category', model: 'Category' },
		{ path: 'subCategory', model: 'SubCategory' },
	]);

	if (!product) {
		throw new BadRequestError('Product Not Found');
	}

	res.status(200).send({ product, success: true });
});

// @desc    delete  product
// @route   delete  /api/v1/product/:id
// @access  private Admin-Manager
exports.deleteProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const product = await Product.findByIdAndDelete(id);
	if (!product) {
		throw new BadRequestError('Product Not Found');
	}
	res.status(204).send({ product, success: true });
});
