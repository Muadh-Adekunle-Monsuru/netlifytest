import express from 'express';

import { getUserByMatric } from 'db/users';
import { random } from 'helpers';

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { matricno, password, email } = req.body;
		if (!email || !password || !matricno) {
			return res.sendStatus(400);
		}

		const existingUser = await getUserByMatric(matricno);

		if (existingUser) {
			return res.sendStatus(400);
		}
		const salt = random();
	} catch (e) {
		console.log(e);
		return res.sendStatus(400);
	}
};
