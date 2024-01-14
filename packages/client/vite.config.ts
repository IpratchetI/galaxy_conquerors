import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@styles': path.resolve(__dirname, './src/style'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@models': path.resolve(__dirname, './src/models'),
			'@components': path.resolve(__dirname, './src/components'),
			'@assets': path.resolve(__dirname, './src/assets')
		}
	},
	server: {
		port: Number(process.env.CLIENT_PORT) || 3000
	},
	define: {
		__SERVER_PORT__: process.env.SERVER_PORT
	},
	plugins: [react()]
})
