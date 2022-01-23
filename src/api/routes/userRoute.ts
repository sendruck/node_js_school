import { NextFunction, Request, Response, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import { Logger } from 'winston';
import { User } from '../../models/user.model';
import { Presenter } from '../../models/presenter.model';
import { getIdParam } from '../../helpers';
import { v1 as uuidv1 } from 'uuid';

const validateWishMaxNumber = (wishes): boolean => {
	if (wishes && wishes.length) {
		return wishes.length <= 10 ? true : false;
	}
	throw new Error('Invalid wishes length');
};

export default (app: Router) => {
	app.post(
		'/signup',
		celebrate({
			body: Joi.object({
				name: Joi.string().required(),
				surname: Joi.string().required(),
				wishes: Joi.array().items(Joi.string()).has(Joi.string()),
			}),
		}),
		async (req: Request, res: Response, next: NextFunction) => {
			const UUID = uuidv1();
			const logger: Logger = Container.get('logger');
			logger.debug(`Calling Signup user: ${JSON.stringify(req.body)}`);

			const data = {
				...req.body,
			};
			const { name, surname, wishes } = data;
			logger.debug(`User Data: ${JSON.stringify(data)}`);
			Presenter.belongsTo(User, { targetKey: 'uuid', foreignKey: 'presenter_id' });

			try {
				if (validateWishMaxNumber(wishes)) {
					await User.create({
						uuid: UUID,
						name,
						surname,
						shuffled: false,
						wishes,
					});

					await Presenter.create({
						presenter_id: UUID,
						recepient_id: null,
					});
					return res.status(201).end();
				}
				return res.status(400).end();
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

	app.get('/:id/wishes', async (req: Request, res: Response, next: NextFunction) => {
		const logger: Logger = Container.get('logger');
		const id = getIdParam(req);
		logger.debug(`Calling Get Wishes by user ID: ${id}`);

		try {
			const user: any = await User.findAll({
				raw: true,
				where: {
					uuid: id,
				},
			});
			logger.debug(`Found user data: ${JSON.stringify(user)}`);
			const wishes: string = user && user.length ? user[0]?.wishes : '';
			return res.status(200).json(wishes);
		} catch (error) {
			logger.error(`Error while calling Get Wishes by ID: ${JSON.stringify(error)}`);
			return next(error);
		}
	});
};
