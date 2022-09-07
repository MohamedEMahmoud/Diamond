const asyncHandler = require('express-async-handler');
const Product = require('../models/product.model');
const factory = require('./handlersFactory');

// @desc    Create product
// @route   POST  /api/v1/product
// @access  Private/Admin-Manager
exports.createProduct = asyncHandler(async (req, res) => {
	const product = new Product(req.body);

	await product.save();

	res.status(201).send({ product, success: true });
});

// @desc    get  specific product
// @route   get  /api/v1/product/:id
// @access  public
exports.getProduct = factory.getOne(Product);

// @desc    get  products
// @route   get  /api/v1/products
// @access  public
exports.getProducts = factory.getAll(Product, 'product');

// @desc    update  product
// @route   patch  /api/v1/product/:id
// @access  private Admin-Manager
exports.updateProduct = factory.updateOne(Product);

// @desc    delete  product
// @route   delete  /api/v1/product/:id
// @access  private Admin-Manager
exports.deleteProduct = factory.deleteOne(Product);
