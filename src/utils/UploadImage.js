const { randomBytes } = require('crypto');
const cloudinary = require('../config/cloudinary');

class UploadImage {
	constructor(files, modelName, document) {
		this.files = files;
		this.modelName = modelName;
		this.document = document;
	}

	upload() {
		return new Promise((resolve, reject) => {
			const fields = ['image', 'imageCover', 'images'];
			fields.map((field) => {
				if (field in this.files) {
					this.files[field].map((file) => {
						const imageId = randomBytes(16).toString('hex');
						const imageOriginalName = file.originalname.replace(
							/\.(jpg|jpeg|png)$/,
							''
						);
						return cloudinary
							.upload_stream(
								{
									public_id: `${
										this.modelName
									}-image/${imageId}-${Date.now()}-${imageOriginalName}`,
									use_filename: true,
									tags: `${imageId}-tag`,
									width: 600,
									height: 600,
									crop: 'scale',
									placeholder: true,
									resource_type: 'auto',
								},
								(err, result) => {
									if (err) {
										console.error(err);
										reject(err);
									} else if (this.files[field].length === 1) {
										this.document[`${file.fieldname}`] = result.secure_url;

										return resolve(this.document);
									} else {
										this.document.images.push({
											id: imageId,
											url: result.secure_url,
										});

										if (
											this.files[field].length === this.document.images.length
										) {
											return resolve(this.document);
										}
									}
								}
							)
							.end(file.buffer);
					});
				}
			});
		});
	}
}

module.exports = UploadImage;
