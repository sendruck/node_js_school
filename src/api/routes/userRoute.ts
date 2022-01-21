import { NextFunction, Request, Response, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import Logger from '../../loaders/logger';

export default (app: Router) => {
	app.post(
		'/signup',
		celebrate({
			body: Joi.object({
				name: Joi.string().required(),
				surName: Joi.string().required(),
				wishes: Joi.array().items(Joi.string()).has(Joi.string()),
			}),
		}),
		async (req: Request, res: Response, next: NextFunction) => {
			Logger.info(`Signup user: ${JSON.stringify(req.body)}`);
			return res.status(201).json({ success: true });
		},
	);
};
