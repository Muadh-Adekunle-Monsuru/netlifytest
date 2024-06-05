// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from '../../backend/dist/router/index.js';
import serverless from 'serverless-http';
const app = express();
app.use(cookieParser());
app.use(
	cors({
		origin: ['https://yabatech-medical.vercel.app', 'http://127.0.0.1:5504'],
		credentials: true,
	})
);
app.use(compression());
app.use(bodyParser.json());
const server = http.createServer(app);
server.listen(8080, () => {
	console.log('Server running on http://localhost:8080/');
});
mongoose.Promise = Promise;
mongoose.connect(
	'mongodb+srv://muadh117a:Rbi7FlqLHLzl5Sdo@cluster0.lncvfhp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
);
mongoose.connection.on('error', (error) => console.log(error));
app.use('/api/', router());

export const handler = serverless(api);
