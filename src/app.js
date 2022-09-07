const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');
const categoryRouter = require('./routes/category.route');
const subCategoryRouter = require('./routes/subCategory.route');
const productRouter = require('./routes/product.route');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./utils/errors/NotFoundError');

require('express-async-errors');

app.use(
	express.json({ extended: false }),
	morgan('dev'),
	cors({ origin: '*' }),
	categoryRouter,
	subCategoryRouter,
	productRouter
);

app.get('/', (_req, res) => {
	res.status(200).send({ apiVersion: '1.0', success: true });
});

app.use('*', async () => {
	throw new NotFoundError('Route Not Found!');
});

app.use(errorHandler);

module.exports = app;
