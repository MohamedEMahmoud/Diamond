const Category = require('../models/category.model');
const factory = require('./handlersFactory');

// @desc    Create category
// @route   POST  /api/v1/category
// @access  Private/Admin-Manager
exports.createCategory = factory.createOne(Category);

// @desc    get  specific category
// @route   get  /api/v1/category/:id
// @access  public
exports.getCategory = factory.getOne(Category);

// @desc    get  categories
// @route   get  /api/v1/categories
// @access  public
exports.getCategories = factory.getAll(Category);

// @desc    update  category
// @route   patch  /api/v1/category/:id
// @access  private Admin-Manager
exports.updateCategory = factory.updateOne(Category);

// @desc    delete  category
// @route   delete  /api/v1/category/:id
// @access  private Admin-Manager
exports.deleteCategory = factory.deleteOne(Category);
