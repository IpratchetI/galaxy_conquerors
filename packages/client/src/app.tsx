import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@pages/Error';
import { AppRouter } from '@components/AppRouter/AppRouter';
import ThemeProvider from '@providers/ThemeProvider';

function App() {
	console.log('Galaxy Conquerors awesome!!');
	return (
		<ErrorBoundary
			fallback={<ErrorPage type="common" />}
			onError={(error, info) => {
				console.error({ error, info });
			}}>
			<ThemeProvider>
				<AppRouter />
			</ThemeProvider>
		</ErrorBoundary>
	);
}

export default App;
