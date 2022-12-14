const { check, body } = require('express-validator');
const slugify = require('slug');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Category = require('../../models/category.model');
const NotFoundError = require('../errors/NotFoundError');

exports.getSubCategoryValidator = [
	check('id')
		.notEmpty()
		.withMessage('id filed is required')
		.isMongoId()
		.withMessage('Invalid category id'),
	validatorMiddleware,
];

exports.createSubCategoryValidator = [
	check('name')
		.isString()
		.withMessage('Name is String filed')
		.notEmpty()
		.withMessage('Name filed is required')
		.isLength({ min: 2 })
		.withMessage('Too short category name')
		.isLength({ max: 32 })
		.withMessage('Too long category name')
		.custom((val, { req }) => {
			req.body.slug = slugify(val);
			return true;
		}),
	check('categoryId')
		.notEmpty()
		.withMessage('Category id is required')
		.isMongoId()
		.withMessage('Invalid category id')
		.custom(async (val, { req }) => {
			const category = await Category.findById(val);
			if (!category) {
				throw new NotFoundError(`No document for this id ${val}`);
			}
			req.body.category = val;
			return true;
		}),
	validatorMiddleware,
];

exports.updateSubCategoryValidator = [
	check('id')
		.notEmpty()
		.withMessage('id filed is required')
		.isMongoId()
		.withMessage('Invalid category id'),
	body('name')
		.isLength({ min: 2 })
		.withMessage('Too short category name')
		.isLength({ max: 32 })
		.withMessage('Too long category name')
		.custom((val, { req }) => {
			if (val) {
				req.body.slug = slugify(val);
			}
			return true;
		}),

	body('category')
		.if(body('category').exists())
		.isMongoId()
		.withMessage('Invalid category id')
		.custom(async (val, { req }) => {
			const category = await Category.findById(val);
			if (!category) {
				throw new NotFoundError(`No document for this id ${val}`);
			}
			req.body.category = val;
			return true;
		}),
	validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
	check('id')
		.notEmpty()
		.withMessage('id filed is required')
		.isMongoId()
		.withMessage('Invalid category id'),
	validatorMiddleware,
];
