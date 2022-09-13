const { check, body } = require('express-validator');
const slugify = require('slug');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getBrandValidator = [
	check('id').isMongoId().withMessage('Invalid brand id'),
	validatorMiddleware,
];

exports.createBrandValidator = [
	check('name')
		.isString()
		.withMessage('Name is String filed')
		.notEmpty()
		.withMessage('Name filed is required')
		.isLength({ min: 3 })
		.withMessage('Too short brand name')
		.isLength({ max: 32 })
		.withMessage('Too long brand name')
		.custom((val, { req }) => {
			req.body.slug = slugify(val);
			return true;
		}),
	validatorMiddleware,
];

exports.updateBrandValidator = [
	check('id').isMongoId().withMessage('Invalid brand id'),
	body('name')
		.if(body('name').exists())
		.custom((val, { req }) => {
			req.body.slug = slugify(val);
			return true;
		}),
	validatorMiddleware,
];

exports.deleteBrandValidator = [
	check('id').isMongoId().withMessage('Invalid brand id'),
	validatorMiddleware,
];
