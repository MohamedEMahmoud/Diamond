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

const router = express.Router();

router.post('/api/v1/product', createProductValidator, createProduct);

router.get('/api/v1/products', getProductValidator, getProducts);

router.get('/api/v1/product/:id', getProduct);

router.patch('/api/v1/product/:id', updateProductValidator, updateProduct);

router.delete('/api/v1/product/:id', deleteProductValidator, deleteProduct);

module.exports = router;
