import { memo } from 'react';

import { Spacer, Text } from '@/components';

import { LinksList } from './components/LinksList';
import styles from './index.module.scss';

const Main = memo(() => (
	<main className={styles.background}>
		<Spacer direction="column" fullHeight gap="80">
			<Text tag="h1" size="xxl" align="center">
				{'Galaxy \n Conquerors'}
			</Text>
			<nav>
				<LinksList />
			</nav>
		</Spacer>
	</main>
));

export default Main;
