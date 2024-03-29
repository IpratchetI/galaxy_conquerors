import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';

import App from '@/app';

import store from './store';

type RenderProps = {
	path: string;
};

export function render({ path }: RenderProps) {
	return renderToString(
		<StaticRouter location={path}>
			<Provider store={store}>
				<App />
			</Provider>
		</StaticRouter>
	);
}
