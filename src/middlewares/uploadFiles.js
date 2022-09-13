const multer = require('multer');
const BadRequestError = require('../utils/errors/BadRequestError');

const storage = multer.memoryStorage();

const upload = multer({ storage });

const imageValidation = (req, _res, next) => {
	const fields = ['image', 'imageCover', 'images'];
	fields.map((field) => {
		if (field in req.files) {
			req.files[field].map((file) => {
				if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
					throw new BadRequestError(
						`${file.originalname} should be a valid image`
					);
				}
				if (file.size > 1e6) {
					throw new BadRequestError(`${file.originalname} is larger.`);
				}
			});
		}
	});
	next();
};
const uploadImage = [
	upload.fields([
		{
			name: 'image',
			maxCount: 1,
		},
		{
			name: 'imageCover',
			maxCount: 1,
		},
		{
			name: 'images',
			maxCount: 6,
		},
	]),
	imageValidation,
];
module.exports = uploadImage;
