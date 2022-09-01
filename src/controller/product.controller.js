const slugify = require('slug');
const asyncHandler = require('express-async-handler');
const Product = require('../models/product.model');
const BadRequestError = require('../utils/errors/BadRequestError');

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
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 5;
	const skip = (page - 1) * limit;
	const products = await Product.find()
		.skip(skip)
		.limit(limit)
		.populate([
			{ path: 'category', model: 'Category' },
			{ path: 'subCategory', model: 'SubCategory' },
		]);
	if (!products.length) {
		throw new BadRequestError('Products not found');
	}
	res
		.status(200)
		.send({ results: products.length, page, products, success: true });
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
