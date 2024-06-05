import { getPatientBySessionToken } from '../db/patients.js';
import { createAppointment } from '../db/appointments.js';
import { getAppointmentsByMatric } from '../db/appointments.js';
import { getAllAppointments } from '../db/appointments.js';
import { updatePatientById } from '../db/patients.js';
export const fetchUserDetails = async (req, res) => {
	const sessionToken = req.cookies['AUTH'];
	const existingPatient = await getPatientBySessionToken(sessionToken);
	res.status(200).json(existingPatient);
};

export const createPatientAppointment = async (req, res) => {
	const sessionToken = req.cookies['AUTH'];
	const { _id, firstname, secondname, phone, gender, matricno } =
		await getPatientBySessionToken(sessionToken);
	const { date, time, condition, address, dateofbirth } = req.body;
	const update = updatePatientById(_id, { address, dateofbirth });
	const appointment = await createAppointment({
		firstname,
		secondname,
		phone,
		gender,
		matricno,
		date,
		time,
		condition,
	});
	return res.status(200).json(appointment);
};

export const getPatientAppointments = async (req, res) => {
	const sessionToken = req.cookies['AUTH'];
	const { matricno } = await getPatientBySessionToken(sessionToken);
	const appointment = await getAppointmentsByMatric(matricno);

	return res.status(200).json(appointment);
};

export const getAllPatientAppointments = async (req, res) => {
	const allAppointments = await getAllAppointments();

	return res.status(200).json(allAppointments);
};
