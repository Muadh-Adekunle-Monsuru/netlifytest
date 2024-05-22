import express from 'express';
import { get, identity, merge } from 'lodash';
import { getUserBySessionToken } from '../db/users';
export const isAuthenticated = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const sessionToken = req.cookies['AUTH'];

		if (!sessionToken) {
			return res.sendStatus(403);
		}

		const existingUser = await getUserBySessionToken(sessionToken);

		if (!existingUser) {
			return res.sendStatus(403);
		}
		merge(req, { identity: existingUser });
		return next();
	} catch (e) {
		console.log(e);
		return res
			.sendStatus(400)
			.json({ message: 'error trying to authenticate user' });
	}
};
