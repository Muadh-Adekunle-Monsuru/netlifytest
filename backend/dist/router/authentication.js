import {
	register,
	login,
	registerPatient,
	loginPatient,
} from '../controllers/authentication.js';
import multer from 'multer';
const upload = multer();
export default (router) => {
	router.post('/staff/register', register);
	router.post('/staff/login', login);

	router.post('/patient/register', upload.none(), registerPatient);
	router.post('/patient/login', upload.none(), loginPatient);
};
