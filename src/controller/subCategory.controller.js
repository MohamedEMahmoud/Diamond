const asyncHandler = require('express-async-handler');
const SubCategory = require('../models/subCategory.model');
const BadRequestError = require('../utils/errors/BadRequestError');
const factory = require('./handlersFactory');

// @desc    Create SubCategory
// @route   POST  /api/v1/subcategory
// @access  Private/Admin-Manager
exports.createSubCategory = asyncHandler(async (req, res) => {
	const { categoryId: category } = req.params;

	const subCategory = await SubCategory.findOne({ slug: req.body.slug });
	if (subCategory) {
		throw new BadRequestError('Category already exists');
	}

	const newSubCategory = new SubCategory({
		...req.body,
		category,
	});

	await newSubCategory.save();

	await newSubCategory.populate({
		path: 'category',
		model: 'Category',
		select: 'name -_id',
	});

	res.status(201).send({
		data: newSubCategory,
		success: true,
	});
});

// @desc    get  specific SubCategory
// @route   get  /api/v1/subcategory/:id
// @access  public
exports.getSubCategory = factory.getOne(SubCategory);

// @desc    get  subCategories
// @route   get  /api/v1/subcategories
// @access  public
exports.getSubCategories = factory.getAll(SubCategory);

// @desc    update  SubCategory
// @route   patch  /api/v1/subcategory/:id
// @access  private Admin-Manager
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc    delete  SubCategory
// @route   delete  /api/v1/subcategory/:id
// @access  private Admin-Manager
exports.deleteSubCategory = factory.deleteOne(SubCategory);
