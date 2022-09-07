const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: [3, 'Too short product title'],
			maxlength: [100, 'Too long product title'],
		},
		slug: {
			type: String,
			required: true,
			lowercase: true,
		},
		description: {
			type: String,
			required: [true, 'product description is required'],
			minlength: [20, 'Too short product description'],
		},
		quantity: {
			type: Number,
			required: [true, 'Product quantity is required'],
		},
		sold: {
			type: Number,
			default: 0,
		},
		price: {
			type: Number,
			required: [true, 'Product price is required'],
			trim: true,
			max: [20000, 'Too long product price'],
		},
		priceAfterDiscount: {
			type: Number,
		},
		colors: [String],
		imageCover: {
			type: String,
			required: [true, 'Product image cover is required'],
		},
		images: [String],
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
		},
		subcategories: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'SubCategory',
			},
		],
		brand: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Brand',
		},
		ratingAverage: {
			type: Number,
			min: [1, 'Rating must be over or equal 1'],
			max: [5, 'Rating must be below or equal 5'],
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
	},
	{
		toJSON: {
			transform(_doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			},
		},
		versionKey: false,
		timestamps: true,
	}
);

productSchema.pre(/^find/, function (next) {
	this.populate([
		{ path: 'category', model: 'Category' },
		{ path: 'subCategory', model: 'SubCategory' },
	]);
	next();
});

productSchema.post('save', function (next) {
	this.populate([
		{ path: 'category', model: 'Category' },
		{ path: 'subCategory', model: 'SubCategory' },
	]);
	next();
});

module.exports = mongoose.model('Product', productSchema);
