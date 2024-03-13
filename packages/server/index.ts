import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

import { createClientAndConnect } from './db';
import { SERVER_BASE_URL } from './constants';
import router from './routes';

dotenv.config();

const { SERVER_PORT, CLIENT_PORT } = process.env;

const app = express();

const serverPort = Number(SERVER_PORT) || 3001;
const clientPort = Number(CLIENT_PORT) || 3000;

app.use(express.json());

const corsOptions = {
	credentials: true,
	origin: [
		`http://127.0.0.1:${clientPort}`,
		`http://127.0.0.1:${serverPort}`,
		`http://localhost:${clientPort}`,
		`http://localhost:${serverPort}`
	]
};

app.use(cors(corsOptions));

createClientAndConnect();

app.use(SERVER_BASE_URL, router);

app.get('/', (_, response) => {
	response.send('🎸 Сервер команды Galaxy Conquerors 🎸');
});

app.listen(serverPort, () => {
	console.log(`  ➜ 🎸 Server is listening on port: ${serverPort}`);
});
