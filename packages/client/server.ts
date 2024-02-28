import fs from 'node:fs/promises';

import { createServer as createViteServer } from 'vite';
import express from 'express';
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.CLIENT_PORT || 3000;

const initialState = {
	userState: { isAuth: false, isLoading: false, score: { maxScore: 0, lastGameScore: 0 } }
};

const templateHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf-8') : '';
const ssrManifest = isProduction
	? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
	: undefined;

const app = express();

const vite = await createViteServer({
	server: { middlewareMode: true },
	appType: 'custom'
});

if (!isProduction) {
	app.use(vite.middlewares);
}

app.use('*', async (req, res) => {
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

		const html = template
			.replace('<!--ssr-app-->', rendered)
			.replace('<!--preloadedState-->', stateMarkup);

		console.log(rendered, 'path:', url);

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

app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
});
