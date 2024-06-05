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
import pkg from 'lodash';
const { merge } = pkg;
import { getUserBySessionToken } from '../db/users.js';
import { getPatientBySessionToken } from '../db/patients.js';
export const isAuthenticated = (req, res, next) =>
	__awaiter(void 0, void 0, void 0, function* () {
		try {
			const sessionToken = req.cookies['AUTH'];
			if (!sessionToken) {
				return res.status(403).json('user has no session cookie');
			}
			const existingUser = yield getUserBySessionToken(sessionToken);
			const existingPatient = yield getPatientBySessionToken(sessionToken);

			if (!existingUser && !existingPatient) {
				return res.status(403).json('user does not exist');
			}
			merge(req, { identity: existingUser || existingPatient });
			return next();
		} catch (e) {
			console.log(e);
			return res
				.sendStatus(400)
				.json({ message: 'error trying to authenticate user' });
		}
	});
