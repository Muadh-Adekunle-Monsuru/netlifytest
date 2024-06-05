import mongoose from 'mongoose';
const AppointmentSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	time: { type: String, required: true },
	description: { type: String },
	doctor: { type: String, required: false },
	status: {
		type: String,
		default: 'Appointment Created',
	},
});
const PatientSchema = new mongoose.Schema({
	firstname: { type: String, required: true },
	secondname: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	gender: { type: String, required: true },
	role: { type: String, required: true },
	dateofbirth: { type: String, required: false },
	address: { type: String, required: false },
	matricno: { type: String, required: true },
	authentication: {
		password: { type: String, required: true, select: false },
		salt: { type: String, select: false },
		sessionToken: { type: String, select: false },
	},
	appointments: { type: [AppointmentSchema], default: [] },
});

export const PatientModel = mongoose.model('Patient', PatientSchema);
export const getPatients = () => PatientModel.find();
export const getPatientByMatric = (matricno) =>
	PatientModel.findOne({ matricno });
export const getPatientBySessionToken = (sessionToken) =>
	PatientModel.findOne({
		'authentication.sessionToken': sessionToken,
	});
export const getPatientById = (id) => PatientModel.findById(id);
export const createPatient = (values) =>
	new PatientModel(values).save().then((user) => user.toObject());

export const updatePatientById = (id, data) =>
	PatientModel.findByIdAndUpdate(id, data);
