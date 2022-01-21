import express from 'express';
import config from './config';
import Logger from './loaders/logger';

async function startServer() {
	const app = express();

	app.listen(config.port, () => {
		Logger.info(`Express loaded: ${config.port}`);
	}).on('error', err => {
		Logger.error(`Server error: ${err}`);
		process.exit(1);
	});
}

startServer();
