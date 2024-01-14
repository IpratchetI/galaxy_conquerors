import App from './app'
import { render, screen } from '@testing-library/react'

const appContent = 'Приложение будет тут'

// @ts-ignore
global.fetch = jest.fn(() =>
	Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
	render(<App />)
	expect(screen.getByText(appContent)).toBeDefined()
})