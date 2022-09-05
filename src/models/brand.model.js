const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name filed is required'],
			unique: [true, 'Name filed is unique'],
			trim: true,
			minlength: [3, 'Too short brand name'],
			maxlength: [32, 'Too long brand name'],
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

module.exports = mongoose.model('Brand', brandSchema);
