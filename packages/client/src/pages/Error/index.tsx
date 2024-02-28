import React from 'react';

import { Link, Spacer, Text } from '@/components';
import { routerPaths } from '@/constants/routerPaths';

import { ErrorType } from './types';
import { errorContent } from './constants';
import styles from './index.module.scss';

export const ErrorPage = ({ type = '404' }: { type?: ErrorType }) => {
	const { title, description } = errorContent[type];

	return (
		<main className={styles.background}>
			<Spacer direction="column" gap="80">
				<Spacer direction="column" gap="50">
					<Text size="xxl">{title}</Text>
					<Text size={type === 'common' ? 'l' : 'xl'} align="center">
						{description}
					</Text>
				</Spacer>
				<Link to={routerPaths.main}>
					<Text className={styles.backLink} align="center">
						go to main
					</Text>
				</Link>
			</Spacer>
		</main>
	);
};
