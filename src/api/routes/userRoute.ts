import { NextFunction, Request, Response, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import { Logger } from 'winston';
import { v1 as uuidv1 } from 'uuid';
import { User } from '../../models/user.model';
import UserService from '../../services/user.service';

export default (app: Router) => {
	const UUID = uuidv1();
	app.post(
		'/signup',
		celebrate({
			body: Joi.object({
				uuid: Joi.string().guid(),
				name: Joi.string().required(),
				surname: Joi.string().required(),
				wishes: Joi.array().items(Joi.string()).has(Joi.string()),
			}),
		}),
		async (req: Request, res: Response, next: NextFunction) => {
			const logger: Logger = Container.get('logger');
			logger.debug(`Calling Signup user: ${JSON.stringify(req.body)}`);

			const data = {
				...req.body,
				uuid: UUID,
				shuffled: false,
			};
			logger.debug(`User Data: ${JSON.stringify(data)}`);

			try {
				await User.create(data);
				return res.status(201).end();
			} catch (error) {
				logger.error(`Error while calling Singup user: ${error}`);
				return next(error);
			}
		},
	);

	app.get('/users', async (req: Request, res: Response, next: NextFunction) => {
		const logger: Logger = Container.get('logger');
		logger.debug(`Calling Get users`);

		try {
			const users = await User.findAll();
			res.status(200).json(users);
		} catch (error) {
			logger.error(`Error while calling Get All users: ${JSON.stringify(error)}`);
			return next(error);
		}
	});
};
