import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

import { createClientAndConnect } from './db';
import { SERVER_BASE_URL } from './constants';
import router from './routes';

dotenv.config();

const { SERVER_PORT, CLIENT_PORT } = process.env;

const app = express();

const port = Number(SERVER_PORT) || 3001;

app.use(express.json());

const corsOptions = {
	credentials: true,
	origin: [`http://127.0.0.1:${CLIENT_PORT}`, `http://localhost:${CLIENT_PORT}`]
};

app.use(cors(corsOptions));

createClientAndConnect();

app.use(SERVER_BASE_URL, router);

app.listen(port, () => {
	console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});

