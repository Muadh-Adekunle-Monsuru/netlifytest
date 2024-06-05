import { isAuthenticated } from '../middlewares/index.js';
import { fetchUserDetails } from '../controllers/patient.js';
import { createPatientAppointment } from '../controllers/patient.js';
import { getPatientAppointments } from '../controllers/patient.js';
import { getAllPatientAppointments } from '../controllers/patient.js';

import multer from 'multer';

const upload = multer();
export default (router) => {
	router.get('/patient/info', isAuthenticated, fetchUserDetails);
	router.post(
		'/patient/createappointment',
		isAuthenticated,
		upload.none(),
		createPatientAppointment
	);
	router.get('/patient/appointment', isAuthenticated, getPatientAppointments);
	router.get('/appointments', isAuthenticated, getAllPatientAppointments);
};
