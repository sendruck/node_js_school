import expressLoader from './express';
import Logger from './logger';
import injector from './injector';
import dbLoader from './db';

export default async ({ expressApp }) => {
	await dbLoader();
	await expressLoader({ app: expressApp });

	await injector();
	Logger.info('Express loaded');
};
