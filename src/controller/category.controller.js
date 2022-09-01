const slugify = require('slug');
const asyncHandler = require('express-async-handler');
const Category = require('../models/category.model');
const BadRequestError = require('../utils/errors/BadRequestError');

// @desc    Create category
// @route   POST  /api/v1/category
// @access  Private/Admin-Manager
exports.createCategory = asyncHandler(async (req, res) => {
	const { name } = req.body;
	const category = await Category.findOne({ slug: slugify(name) });
	if (category) {
		throw new BadRequestError('Category already exists');
	}

	const newCategory = new Category({
		name,
		slug: slugify(name),
	});

	await newCategory.save();

	res.status(201).send({ category: newCategory, success: true });
});

// @desc    get  specific category
// @route   get  /api/v1/category/:id
// @access  public
exports.getCategory =  asyncHandler(async (req, res) => {
	const { id } = req.params;

	const category = await Category.findOne({ id });
	if (!category) {
		throw new BadRequestError('Category not found');
	}

	res.status(200).send({ category, success: true });
});

// @desc    get  categories
// @route   get  /api/v1/categories
// @access  public
exports.getCategories =  asyncHandler(async (req, res) => {
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 5;
	const skip = (page - 1) * limit;
	const categories = await Category.find().skip(skip).limit(limit);
	if (!categories.length) {
		throw new BadRequestError('Categories not found');
	}
	res
		.status(200)
		.send({ results: categories.length, page, categories, success: true });
});

// @desc    update  category
// @route   patch  /api/v1/category/:id
// @access  private Admin-Manager
exports.updateCategory =  asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	const category = await Category.findOneAndUpdate(
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

	if (!category) {
		throw new BadRequestError('Category Not Found');
	}

	res.status(200).send({ category, success: true });
});

// @desc    delete  category
// @route   delete  /api/v1/category/:id
// @access  private Admin-Manager
exports.deleteCategory =  asyncHandler(async (req, res) => {
	const { id } = req.params;
	const category = await Category.findByIdAndDelete(id);
	if (!category) {
		throw new BadRequestError('Category Not Found');
	}
	res.status(204).send({ category, success: true });
});
