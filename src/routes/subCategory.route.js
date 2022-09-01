const express = require('express');

const router = express.Router();
const {
	createSubCategory,
	getSubCategory,
	getSubCategories,
	updateSubCategory,
	deleteSubCategory,
} = require('../controller/subCategory.controller');
const {
	getSubCategoryValidator,
	createSubCategoryValidator,
	updateSubCategoryValidator,
	deleteSubCategoryValidator,
} = require('../utils/validators/subCategoryValidator');

router.post(
	'/api/v1/:categoryId/subcategory',
	createSubCategoryValidator,
	createSubCategory
);

router.get('/api/v1/subcategory/:id', getSubCategoryValidator, getSubCategory);

router.get('/api/v1/subcategories', getSubCategories);

router.patch(
	'/api/v1/subcategory/:id',
	updateSubCategoryValidator,
	updateSubCategory
);

router.delete(
	'/api/v1/subcategory/:id',
	deleteSubCategoryValidator,
	deleteSubCategory
);

module.exports = router;
