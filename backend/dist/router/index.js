import express from 'express';
import authentication from './authentication.js';
import users from './users.js';
import multer from 'multer';
import patient from './patient.js';

const upload = multer();
const router = express.Router();
export default () => {
	authentication(router);
	users(router);
	homeRoute(router);
	homePost(router);
	patient(router);
	return router;
};

const reqList = [];
const homeRoute = (router) => {
	router.get('/hello', (req, res) => {
		res.json({
			message: 'Connected to Yabatech Backend Server ✌️',
			data: reqList,
		});
	});
};

const homePost = (router) => {
	router.post('/submit', upload.none(), (req, res) => {
		console.log(req.body);
		res.json({ message: 'Data Received 🎉' });
	});
};
