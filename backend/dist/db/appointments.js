import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
	firstname: { type: String, required: true },
	secondname: { type: String, required: true },
	phone: { type: String, required: true },
	gender: { type: String, required: true },
	date: { type: Date, required: true },
	time: { type: String, required: true },
	condition: { type: String },
	doctor: { type: String, required: false, default: 'Unassigned' },
	status: {
		type: String,
		default: 'Appointment Created',
	},
	matricno: { type: String, required: true },
});

export const AppointmentModel = mongoose.model(
	'Appointment',
	AppointmentSchema
);

export const getAllAppointments = () => AppointmentModel.find();
export const getAppointmentsById = (id) => AppointmentModel.findById(id);
export const getAppointmentsByMatric = (matricno) =>
	AppointmentModel.find({ matricno });
export const createAppointment = (values) =>
	new AppointmentModel(values).save().then((user) => user.toObject());
