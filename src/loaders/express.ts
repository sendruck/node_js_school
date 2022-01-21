import express from 'express';
import cors from 'cors';
import config from '../config';
import routes from '../api';

export default ({ app }: { app: express.Application }) => {
	app.get('/status', (req, res) => {
		res.status(200).end();
	});

	app.use(cors());

	app.use(express.json());
	// Load API routes
	app.use(config.api.prefix, routes());

	/**
	 * 404 and forward to error handler
	 */
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err['status'] = 404;
		next(err);
	});

	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.json({
			errors: {
				message: err.message,
			},
		});
	});
};
