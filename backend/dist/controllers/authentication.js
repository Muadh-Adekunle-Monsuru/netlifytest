var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
import { getUserByMatric } from '../db/users.js';
import { getPatientByMatric, createPatient } from '../db/patients.js';
import { random, authentication } from '../helpers/index.js';
import { createUser } from '../db/users.js';
import { getPatientBySessionToken } from '../db/patients.js';
export const login = (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		try {
			console.log(req.body);
			const { matricno, password } = req.body;
			if (!matricno || !password) {
				return res.status(400).json({ message: 'matric or password missing' });
			}
			const user = yield getUserByMatric(matricno).select(
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
			yield user.save();
			res.cookie('AUTH', user.authentication.sessionToken, {
				domain: 'localhost',
				path: '/',
			});
			return res.status(200).json(user).end;
		} catch (e) {
			console.log(e);
			return res.sendStatus(400);
		}
	});
export const register = (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		try {
			const { matricno, password, email, role } = req.body;
			if (!email || !password || !matricno || !role) {
				return res
					.status(400)
					.json({ message: 'Registration details not complete' });
			}
			const existingUser = yield getUserByMatric(matricno);
			if (existingUser) {
				return res.status(400).json({ message: 'this user already exists' });
			}
			const salt = random();
			const user = yield createUser({
				email,
				matricno,
				role,
				authentication: {
					salt,
					password: authentication(salt, password),
				},
			});
			return res.status(200).json(user).end;
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: `Error registering user ${e}` });
		}
	});
export const registerPatient = (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		try {
			console.log(req.body);
			const {
				firstname,
				secondname,
				email,
				phone,
				gender,
				role,
				matricno,
				password,
			} = req.body;
			if (
				!firstname ||
				!secondname ||
				!phone ||
				!gender ||
				!email ||
				!password ||
				!matricno ||
				!role
			) {
				return res.status(400).json({
					message: 'Registration details not complete, fill in all details.',
				});
			}
			const existingPatient = yield getPatientByMatric(matricno);
			if (existingPatient) {
				return res
					.status(400)
					.json({ message: 'This user already exists,login instead' });
			}
			const salt = random();
			const user = yield createPatient({
				firstname,
				secondname,
				phone,
				gender,
				email,
				matricno,
				role,
				authentication: {
					salt,
					password: authentication(salt, password),
				},
			});
			return res.status(200).json({ message: 'Login Successful' }).end;
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: `Error registering user ${e}` });
		}
	});
export const loginPatient = (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
		try {
			console.log(req.body);
			const { matricno, password } = req.body;
			if (!matricno || !password) {
				return res.status(400).json({ message: 'matric or password missing' });
			}
			const user = yield getPatientByMatric(matricno).select(
				'+authentication.salt +authentication.password'
			);
			if (!user) {
				return res
					.status(400)
					.json({ message: 'user does not exist, register your account' });
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
			yield user.save();
			res.cookie('AUTH', user.authentication.sessionToken, {
				httpOnly: true, // Ensure the cookie is only accessible by the web server
				secure: true, // Set to true if you are using HTTPS
				sameSite: 'None', // Helps with CSRF protection
			});
			return res.status(200).json(user).end;
		} catch (e) {
			console.log(e);
			return res.sendStatus(400);
		}
	});

export const fetchUserDetails = async (req, res) => {
	const sessionToken = req.cookies['AUTH'];
	const existingPatient = await getPatientBySessionToken(sessionToken);
	res.status(200).json(existingPatient);
};
