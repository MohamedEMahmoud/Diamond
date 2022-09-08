const asyncHandler = require('express-async-handler');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ApiFeatures = require('../utils/ApiFeatures');

exports.createOne = (Model, ModelName = '') =>
	asyncHandler(async (req, res) => {
		const document = await Model.findOne({ slug: req.body.slug });
		if (document && ModelName) {
			throw new BadRequestError(`${ModelName} already exists`);
		}

		const newDocument = new Model(req.body);

		await newDocument.save();

		res.status(201).send({ data: newDocument, success: true });
	});

exports.getOne = (Model) =>
	asyncHandler(async (req, res) => {
		const { id } = req.params;

		const document = await Model.findOne({ id });
		if (!document) {
			throw new NotFoundError(`No document for this id ${id} `);
		}

		res.status(200).send({ data: document, success: true });
	});

exports.getAll = (Model) =>
	asyncHandler(async (req, res) => {
		const documentsCount = await Model.countDocuments();
		const apiFeatures = new ApiFeatures(Model.find({}), req.query)
			.filter()
			.sort()
			.limitFields()
			.search()
			.paginate(documentsCount);

		const { paginationResults, mongooseQuery } = apiFeatures;
		const documents = await mongooseQuery;

		res.status(200).send({
			results: documents.length,
			paginationResults,
			data: {
				documents,
			},
			success: true,
		});
	});

exports.updateOne = (Model) =>
	asyncHandler(async (req, res) => {
		const document = await Model.findOneAndUpdate(req.params.id, req.body, {
			new: true,
		});

		if (!document) {
			throw new NotFoundError(`No document for this id ${req.params.id}`);
		}

		res.status(200).send({ document, success: true });
	});

exports.deleteOne = (Model) =>
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const document = await Model.findByIdAndDelete(id);
		if (!document) {
			throw new NotFoundError(`No document for this id ${id}`);
		}
		res.status(204).send({});
	});
