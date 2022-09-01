const slugify = require('slug');
const asyncHandler = require('express-async-handler');
const Brand = require('../models/brand.model');
const BadRequestError = require('../utils/errors/BadRequestError');

// @desc    Create brand
// @route   POST  /api/v1/brand
// @access  Private/Admin-Manager
exports.createBrand = asyncHandler(async (req, res) => {
	const { name } = req.body;
	const brand = await Brand.findOne({ slug: slugify(name) });
	if (brand) {
		throw new BadRequestError('Brand already exists');
	}

	const newBrand = new Brand({
		name,
		slug: slugify(name),
	});

	await newBrand.save();

	res.status(201).send({ brand: newBrand, success: true });
});

// @desc    get  specific brand
// @route   get  /api/v1/brand/:id
// @access  public
exports.getBrand = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const brand = await Brand.findOne({ id });
	if (!brand) {
		throw new BadRequestError('Brand not found');
	}

	res.status(200).send({ brand, success: true });
});

// @desc    get  brands
// @route   get  /api/v1/brands
// @access  public
exports.getBrands = asyncHandler(async (req, res) => {
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 5;
	const skip = (page - 1) * limit;
	const brands = await Brand.find().skip(skip).limit(limit);
	if (!brands.length) {
		throw new BadRequestError('Brands not found');
	}
	res.status(200).send({ results: brands.length, page, brands, success: true });
});

// @desc    update  brand
// @route   patch  /api/v1/brand/:id
// @access  private Admin-Manager
exports.updateBrand = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	const brand = await Brand.findOneAndUpdate(
		{
			id,
		},
		{
			name,
			slug: slugify(name),
		},
		{
			new: true,
		}
	);

	if (!brand) {
		throw new BadRequestError('Brand Not Found');
	}

	res.status(200).send({ brand, success: true });
});

// @desc    delete  brand
// @route   delete  /api/v1/brand/:id
// @access  private Admin-Manager
exports.deleteBrand = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const brand = await Brand.findByIdAndDelete(id);
	if (!brand) {
		throw new BadRequestError('Brand Not Found');
	}
	res.status(204).send({ brand, success: true });
});
