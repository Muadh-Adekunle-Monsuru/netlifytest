import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
require('dotenv').config();
import mongoose from 'mongoose';

const app = express();

app.use(
	cors({
		credentials: true,
	})
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

app.get('/', (req, res) => {
	res.json('reached mee');
});
app.post('/', (req, res) => {
	console.log('post called');
	res.status(200).json(req.body);
});

server.listen(8080, () => {
	console.log('Server running on http://localhost:8080/');
});

const url = process.env.MONGODB_URI;
console.log(url);

mongoose.Promise = Promise;
mongoose.connect(url);
mongoose.connection.on('error', (error: Error) => console.log(error));
