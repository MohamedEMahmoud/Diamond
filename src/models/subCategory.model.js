const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'SubCategory name is required'],
			unique: [true, 'SubCategory name must be unique'],
			minLength: [2, 'To short SubCategory name'],
			maxLength: [32, 'To long SubCategory name'],
		},
		slug: {
			type: String,
			lowercase: true,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: [true, 'SubCategory must be belong to parent category'],
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

subCategorySchema.pre(/^find/, function (next) {
	this.populate({
		path: 'category',
		model: 'Category',
		select: 'name -_id',
	});
	next();
});

subCategorySchema.post('save', async (doc, next) => {
	await doc.populate({
		path: 'category',
		model: 'Category',
		select: 'name -_id',
	});
	next();
});

module.exports = mongoose.model('subCategory', subCategorySchema);
