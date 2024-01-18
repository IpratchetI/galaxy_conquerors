import { resolve } from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import svgr from 'vite-plugin-svgr';

import tsconfig from './tsconfig.paths.json';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			...Object.fromEntries(
				// Отсекаем "/*" с конца путей из tsconfig'а
				Object.entries(tsconfig.compilerOptions.paths || []).map(([alias, [folder]]) => [
					alias.replace(/(.*)(\/\*)$/, '$1').toString(),
					resolve(__dirname, folder.replace(/(.*)(\/\*)$/, '$1'))
				])
			)
		}
	},
	server: {
		port: Number(process.env.CLIENT_PORT) || 3000
	},
	define: {
		__SERVER_PORT__: process.env.SERVER_PORT
	},
	plugins: [
		svgr({
			include: '**/*.svg'
		}),
		react()
	]
});
