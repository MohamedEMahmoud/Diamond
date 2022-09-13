const express = require('express');

const router = express.Router();
const {
	createCategory,
	getCategory,
	getCategories,
	updateCategory,
	deleteCategory,
} = require('../controller/category.controller');
const {
	getCategoryValidator,
	createCategoryValidator,
	updateCategoryValidator,
	deleteCategoryValidator,
} = require('../utils/validators/categoryValidator');

const uploadImage = require('../middlewares/uploadFiles');

router.post(
	'/api/v1/category',
	[uploadImage, createCategoryValidator],
	createCategory
);

router.get('/api/v1/category/:id', getCategoryValidator, getCategory);

router.get('/api/v1/categories', getCategories);

router.patch(
	'/api/v1/category/:id',
	[uploadImage, updateCategoryValidator],
	updateCategory
);

router.delete('/api/v1/category/:id', deleteCategoryValidator, deleteCategory);

module.exports = router;
