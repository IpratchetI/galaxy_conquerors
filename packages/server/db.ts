import * as process from 'process';

import { type SequelizeOptions, Sequelize } from 'sequelize-typescript';

import User from './db-models/user';
import Theme from './db-models/theme';
import { isDev } from './utils/isDev';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;

export const createClientAndConnect = async (): Promise<Sequelize | null> => {
	try {
		const sequelizeOptions: SequelizeOptions = {
			dialect: 'postgres',
			username: POSTGRES_USER ?? 'postgres',
			host: isDev() ? 'localhost' : POSTGRES_HOST ?? 'postgres',
			database: POSTGRES_DB ?? 'postgres',
			password: POSTGRES_PASSWORD ?? 'postgres',
			port: Number(POSTGRES_PORT) ?? 5432,
			models: [User, Theme]
		};

		const sequelize = new Sequelize(sequelizeOptions);

		User.hasOne(Theme, { foreignKey: 'theme_id' });

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
