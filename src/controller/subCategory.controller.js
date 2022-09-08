const SubCategory = require('../models/subCategory.model');
const factory = require('./handlersFactory');

// @desc    Create SubCategory
// @route   POST  /api/v1/subcategory
// @access  Private/Admin-Manager
exports.createSubCategory = factory.createOne(SubCategory, 'subcategory');

// @desc    get  specific SubCategory
// @route   get  /api/v1/subcategory/:id
// @access  public
exports.getSubCategory = factory.getOne(SubCategory);

// @desc    get  subCategories
// @route   get  /api/v1/subcategories
// @access  public
exports.getSubCategories = factory.getAll(SubCategory);

// @desc    update  SubCategory
// @route   patch  /api/v1/subcategory/:id
// @access  private Admin-Manager
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc    delete  SubCategory
// @route   delete  /api/v1/subcategory/:id
// @access  private Admin-Manager
exports.deleteSubCategory = factory.deleteOne(SubCategory);
