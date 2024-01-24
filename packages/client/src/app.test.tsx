import { render } from '@testing-library/react';

import App from './app';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

test.skip('Example test', async () => {
	render(<App />);
	//stub
	expect(true).toBe(true);
});
