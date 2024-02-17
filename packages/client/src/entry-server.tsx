import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import App from '@/app';

type RenderProps = {
	path: string;
};

export function render({ path }: RenderProps) {
	return renderToString(
		<StaticRouter location={path}>
			<App />
		</StaticRouter>
	);
}
