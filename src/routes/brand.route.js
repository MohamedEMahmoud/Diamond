const express = require('express');

const router = express.Router();
const {
	createBrand,
	getBrand,
	getBrands,
	updateBrand,
	deleteBrand,
} = require('../controller/brand.controller');
const {
	getBrandValidator,
	createBrandValidator,
	updateBrandValidator,
	deleteBrandValidator,
} = require('../utils/validators/brandValidator');


router.post('/api/v1/brand', createBrandValidator, createBrand);

router.get('/api/v1/brand/:id', getBrandValidator, getBrand);

router.get('/api/v1/brands', getBrands);

router.patch('/api/v1/brand/id', updateBrandValidator, updateBrand);

router.delete('/api/v1/brand/:id', deleteBrandValidator, deleteBrand);


module.exports = router;
