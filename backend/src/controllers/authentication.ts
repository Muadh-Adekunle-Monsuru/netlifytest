import express from 'express';

import { getUserByMatric } from '../db/users';
import { random, authentication } from '../helpers/index';
import { createUser } from '../db/users';

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { matricno, password } = req.body;

		if (!matricno || !password) {
			return res.status(400).json({ message: 'matric or password missing' });
		}
		const user = await getUserByMatric(matricno).select(
			'+authentication.salt +authentication.password'
		);
		if (!user) {
			return res.status(400).json({ message: 'user does not exist' });
		}

		const expectedHash = authentication(user.authentication.salt, password);
		//checking if paswword matrched
		if (user.authentication.password !== expectedHash) {
			return res.status(403).json({ message: 'wrong password' });
		}
		const salt = random();
		user.authentication.sessionToken = authentication(
			salt,
			user._id.toString()
		);
		await user.save();

		res.cookie('AUTH', user.authentication.sessionToken, {
			domain: 'localhost',
			path: '/',
		});

		return res.status(200).json(user).end;
	} catch (e) {
		console.log(e);
		return res.sendStatus(400);
	}
};
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
		const user = await createUser({
			email,
			matricno,
			authentication: {
				salt,
				password: authentication(salt, password),
			},
		});
		return res.status(200).json(user).end;
	} catch (e) {
		console.log(e);
		return res.sendStatus(400);
	}
};
