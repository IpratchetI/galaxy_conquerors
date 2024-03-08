import { promises as fs } from 'fs';
import * as path from 'path';
import * as http from 'http';

import { createServer as createViteServer } from 'vite';
import { Request, Response } from 'express';
import express from 'express';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.CLIENT_PORT || 3000;

async function getStyleSheets() {
	try {
		const assetsPath = './dist/client/assets';
		const files = await fs.readdir(assetsPath);
		const cssAssets = files.filter(l => l.endsWith('.css'));
		const allContent = [];
		for (const asset of cssAssets) {
			const content = await fs.readFile(path.join(assetsPath, asset), 'utf-8');
			allContent.push(content);
		}
		return `<style type="text/css">${allContent.join('')}</style>`;
	} catch (e) {
		console.error(e);
	}
}

const initialState = {
	uiState: { sounds: true, music: true }
};

async function createServer() {
	const templateHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf-8') : '';
	const ssrManifest = isProduction
		? await fs.readFile('./dist/client/ssr-manifest.json', 'utf-8')
		: undefined;

	const app = express();

	const vite = await createViteServer({
		server: { middlewareMode: true },
		appType: 'custom'
	});

	isProduction
		? app.use('/', express.static('./dist/client', { index: false }))
		: app.use(vite.middlewares);

	app.use('*', async (req: Request, res: Response) => {
		try {
			const url = req.originalUrl;

			let template;
			let render;
			if (!isProduction) {
				template = await fs.readFile('./index.html', 'utf-8');
				template = await vite.transformIndexHtml(url, template);
				render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
			} else {
				template = templateHtml;
				render = (await vite.ssrLoadModule('./dist/server/entry-server.js')).render;
			}

			const cookies = req.cookies;
			const rendered = await render({ path: url }, cookies, ssrManifest);

			const stateMarkup = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
				initialState
			)}</script>`;

			const stylesSheets = isProduction ? await getStyleSheets() : '';
			const html = template
				.replace('<!--ssr-app-->', rendered)
				.replace('<!--ssr-styles-->', stylesSheets ?? '')
				.replace('<!--preloadedState-->', stateMarkup);

			res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
		} catch (e) {
			if (e instanceof Error) {
				vite.ssrFixStacktrace(e);
				console.log(e.stack);
				res.status(500).end(e.stack);
			}
		}
	});

	app.use(express.static('./dist/client/assets'));

	const server = http.createServer(app);

	server.listen(port, () => {
		console.log(`Server started at http://localhost:${port}`);
	});
}

createServer();
