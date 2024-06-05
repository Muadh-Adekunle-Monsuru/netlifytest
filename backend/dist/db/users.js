import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
	email: { type: String, required: true },
	matricno: { type: String, required: true },
	role: { type: String, required: true },
	authentication: {
		password: { type: String, required: true, select: false },
		salt: { type: String, select: false },
		sessionToken: { type: String, select: false },
	},
});
export const UserModel = mongoose.model('User', UserSchema);
export const getUsers = () => UserModel.find();
export const getUserByMatric = (matricno) => UserModel.findOne({ matricno });
export const getUserBySessionToken = (sessionToken) =>
	UserModel.findOne({
		'authentication.sessionToken': sessionToken,
	});
export const getUserById = (id) => UserModel.findById(id);
export const createUser = (values) =>
	new UserModel(values).save().then((user) => user.toObject());
