const express = require('express');
const {
	createProduct,
	getProduct,
	getProducts,
	updateProduct,
	deleteProduct,
} = require('../controller/product.controller');

const {
	createProductValidator,
	getProductValidator,
	updateProductValidator,
	deleteProductValidator,
} = require('../utils/validators/productValidator');

const uploadImage = require('../middlewares/uploadFiles');

const router = express.Router();

router.post(
	'/api/v1/product',
	[uploadImage, createProductValidator],
	createProduct
);

router.get('/api/v1/products', getProducts);

router.get('/api/v1/product/:id', getProductValidator, getProduct);

router.patch(
	'/api/v1/product/:id',
	[uploadImage, updateProductValidator],
	updateProduct
);

router.delete('/api/v1/product/:id', deleteProductValidator, deleteProduct);

module.exports = router;
