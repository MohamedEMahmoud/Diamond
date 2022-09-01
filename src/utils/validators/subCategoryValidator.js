const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

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
		.withMessage('Too long category name'),
	check('categoryId')
		.notEmpty()
		.withMessage('Category id is required')
		.isMongoId()
		.withMessage('Invalid category id'),
	validatorMiddleware,
];

exports.updateSubCategoryValidator = [
	check('id')
		.notEmpty()
		.withMessage('id filed is required')
		.isMongoId()
		.withMessage('Invalid category id'),
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
