import * as process from 'process';

import { type SequelizeOptions, Sequelize } from 'sequelize-typescript';

import User from './db-models/user';
import { Reaction } from './db-models/reaction';
import { Comment, Topic } from './forum';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;
const isDockerEnvironment = Number(process.env.DOCKER_ENVIRONMENT) === 1;

export const createClientAndConnect = async (): Promise<Sequelize | null> => {
	try {
		const sequelizeOptions: SequelizeOptions = {
			dialect: 'postgres',
			username: POSTGRES_USER ?? 'postgres',
			host: isDockerEnvironment ? POSTGRES_HOST ?? 'postgres' : POSTGRES_HOST,
			database: POSTGRES_DB ?? 'postgres',
			password: POSTGRES_PASSWORD ?? 'postgres',
			port: Number(POSTGRES_PORT) ?? 5432,
			models: [User, Reaction, Topic, Comment]
		};

		const sequelize = new Sequelize(sequelizeOptions);

		await sequelize
			.authenticate()
			.then(() => {
				console.log('Authenticated at the database');
			})
			.catch(e => {
				console.log('Huston, we have a problem: ', e);
			});

		sequelize
			.sync()
			.then(res => {
				console.log('  ➜ 🎸 Connected to the database with options:', res.options);
			})
			.catch(e => {
				console.log('Synchronization error: ', e);
			});

		return sequelize;
	} catch (e) {
		console.error(e);
	}

	return null;
};
