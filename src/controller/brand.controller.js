const Brand = require('../models/brand.model');
const factory = require('./handlersFactory');

// @desc    Create brand
// @route   POST  /api/v1/brand
// @access  Private/Admin-Manager
exports.createBrand = factory.createOne(Brand);

// @desc    get  specific brand
// @route   get  /api/v1/brand/:id
// @access  public
exports.getBrand = factory.getOne(Brand);

// @desc    get  brands
// @route   get  /api/v1/brands
// @access  public
exports.getBrands = factory.getAll(Brand);

// @desc    update  brand
// @route   patch  /api/v1/brand/:id
// @access  private Admin-Manager
exports.updateBrand = factory.updateOne(Brand);

// @desc    delete  brand
// @route   delete  /api/v1/brand/:id
// @access  private Admin-Manager
exports.deleteBrand = factory.deleteOne(Brand);
