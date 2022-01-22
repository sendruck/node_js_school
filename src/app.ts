import 'reflect-metadata';

import express from 'express';
import config from './config';
import Logger from './loaders/logger';

async function startServer() {
	const app = express();

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	await require('./loaders').default({ expressApp: app });

	app.listen(config.port, () => {
		Logger.info(`Express loaded: ${config.port}`);
	}).on('error', err => {
		Logger.error(`Server error: ${err}`);
		process.exit(1);
	});
}

startServer();
