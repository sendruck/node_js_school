import { Request } from 'express';

export const getIdParam = (req: Request) => {
	const id = req.params.id;
	if (/^\d+$/.test(id)) {
		return Number.parseInt(id, 10);
	}
	throw new TypeError(`Invalid parameter ":id": "${id}"`);
};
