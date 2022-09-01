const slugify = require('slug');
const asyncHandler = require('express-async-handler');
const SubCategory = require('../models/subCategory.model');
const BadRequestError = require('../utils/errors/BadRequestError');

// @desc    Create SubCategory
// @route   POST  /api/v1/subcategory
// @access  Private/Admin-Manager
exports.createSubCategory = asyncHandler(async (req, res) => {
	const { name } = req.body;

	const { categoryId: category } = req.params;

	const subCategory = await SubCategory.findOne({ slug: slugify(name) });
	if (subCategory) {
		throw new BadRequestError('Category already exists');
	}

	const newCategory = new SubCategory({
		name,
		category,
		slug: slugify(name),
	});

	await newCategory.save();

	res.status(201).send({
		subCategory: await newCategory.populate({
			path: 'category',
			model: 'Category',
			select: 'name -_id',
		}),
		success: true,
	});
});

// @desc    get  specific SubCategory
// @route   get  /api/v1/subcategory/:id
// @access  public
exports.getSubCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const subCategory = await SubCategory.findOne({ id });
	if (!subCategory) {
		throw new BadRequestError('Category not found');
	}

	res.status(200).send({ subCategory, success: true });
});

// @desc    get  subCategories
// @route   get  /api/v1/subcategories
// @access  public
exports.getSubCategories = asyncHandler(async (req, res) => {
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 5;
	const skip = (page - 1) * limit;
	const subCategories = await SubCategory.find().skip(skip).limit(limit);
	if (!subCategories.length) {
		throw new BadRequestError('Categories not found');
	}
	res.status(200).send({
		results: subCategories.length,
		page,
		subCategories,
		success: true,
	});
});

// @desc    update  SubCategory
// @route   patch  /api/v1/subcategory/:id
// @access  private Admin-Manager
exports.updateSubCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	const subCategory = await SubCategory.findOneAndUpdate(
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

	if (!subCategory) {
		throw new BadRequestError('Category Not Found');
	}

	res.status(200).send({ subCategory, success: true });
});

// @desc    delete  SubCategory
// @route   delete  /api/v1/subcategory/:id
// @access  private Admin-Manager
exports.deleteSubCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const subCategory = await SubCategory.findByIdAndDelete(id);
	if (!subCategory) {
		throw new BadRequestError('SubCategory Not Found');
	}
	res.status(204).send({ subCategory, success: true });
});
