import { Container } from 'typedi';
import LoggerInstance from './logger';

export default () => {
	try {
		Container.set('logger', LoggerInstance);
	} catch (e) {
		LoggerInstance.error('Error occured on DI injector initialization', e);
		throw e;
	}
};
