const { check } = require('express-validator');
const slugify = require('slug');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const BadRequestError = require('../errors/BadRequestError');
const Category = require('../../models/category.model');
const SubCategory = require('../../models/subCategory.model');

exports.createProductValidator = [
	check('title')
		.isString()
		.withMessage('title is String filed')
		.notEmpty()
		.withMessage('title filed is required')
		.isLength({ min: 3 })
		.withMessage('Too short product title')
		.isLength({ max: 100 })
		.withMessage('Too long product title')
		.custom((val, { req }) => {
			req.body.slug = slugify(val);
			return true;
		}),
	check('description')
		.isString()
		.withMessage('description is String filed')
		.notEmpty()
		.withMessage('description filed is required')
		.isLength({ min: 20 })
		.withMessage('Too short product description')
		.isLength({ max: 2000 })
		.withMessage('Too long product description'),
	check('quantity')
		.notEmpty()
		.withMessage('Quantity filed is required')
		.isNumeric()
		.withMessage('product quantity must be a number'),
	check('sold').optional().isNumeric().withMessage('sold must be a number'),
	check('price')
		.notEmpty()
		.withMessage('Price filed is required')
		.isNumeric()
		.withMessage('price must be a number')
		.isLength({ max: 20000 })
		.withMessage('Too long product price'),
	check('priceAfterDiscount')
		.optional()
		.isNumeric()
		.withMessage('priceAfterDiscount must be a number')
		.toFloat()
		.custom((val, { req }) => {
			if (req.body.price <= val) {
				throw new BadRequestError(
					'priceAfterDiscount must be lower than price'
				);
			}
			return true;
		}),
	check('colors')
		.optional()
		.isArray()
		.withMessage('availableColors should be array of string'),
	check('imageCover').notEmpty().withMessage('Product imageCover is required'),
	check('images')
		.optional()
		.isArray()
		.withMessage('images should be array of string'),
	check('category')
		.notEmpty()
		.withMessage('Product must be belong to a category')
		.isMongoId()
		.withMessage('Invalid ID formate')
		.custom(async (categoryId) => {
			const category = await Category.findById(categoryId);
			if (!category) {
				throw new BadRequestError(`No category for this id: ${categoryId}`);
			}
			return true;
		}),
	check('subcategories')
		.optional()
		.isMongoId()
		.withMessage('Invalid ID formate')
		.custom(async (subcategoriesIds) => {
			const subCategories = await SubCategory.find({
				_id: { $exists: true, $in: subcategoriesIds },
			});
			if (
				subCategories.length < 1 ||
				subCategories.length !== subcategoriesIds.length
			) {
				throw new BadRequestError(`Invalid subcategories Ids`);
			}
			return true;
		})
		.custom(async (val, { req }) => {
			const subCategories = await SubCategory.find({
				category: req.body.category,
			});
			const subCategoriesIdsInDB = [];
			subCategories.forEach((subCategory) => {
				subCategoriesIdsInDB.push(subCategory._id.toString());
			});
			// check if subcategories ids in db include subcategories in req.body (true)
			const checker = (target, arr) => target.every((v) => arr.includes(v));
			if (!checker(val, subCategoriesIdsInDB)) {
				throw new BadRequestError('subcategories not belong to category');
			}
			return true;
		}),

	check('brand').optional().isMongoId().withMessage('Invalid ID formate'),
	check('ratingsAverage')
		.optional()
		.isNumeric()
		.withMessage('ratingsAverage must be a number')
		.isLength({ min: 1 })
		.withMessage('Rating must be above or equal 1.0')
		.isLength({ max: 5 })
		.withMessage('Rating must be below or equal 5.0'),
	check('ratingsQuantity')
		.optional()
		.isNumeric()
		.withMessage('ratingsQuantity must be a number'),
	validatorMiddleware,
];

exports.getProductValidator = [
	check('id').isMongoId().withMessage('Invalid product id'),
	validatorMiddleware,
];

exports.updateProductValidator = [
	check('id').isMongoId().withMessage('Invalid product id'),
	validatorMiddleware,
];

exports.deleteProductValidator = [
	check('id').isMongoId().withMessage('Invalid product id'),
	validatorMiddleware,
];
