const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name filed is required'],
			unique: [true, 'Name filed is unique'],
			trim: true,
			minlength: [3, 'Too short category name'],
			maxlength: [32, 'Too long category name'],
		},
		slug: {
			type: String,
			required: [true, 'Slug filed is required'],
			unique: [true, 'Slug filed is unique'],
			trim: true,
		},
		image: String,
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

module.exports = mongoose.model('Category', categorySchema);
