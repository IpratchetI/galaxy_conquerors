import { PropsWithChildren, ReactElement } from 'react';
import { Spacer } from '@components/Spacer';
import { Text } from '@components/Text';

import styles from './FormCard.module.scss';

interface IFormCardProps extends PropsWithChildren {
	text: string;
	footer: ReactElement;
}

export const FormCard = (props: IFormCardProps) => {
	return (
		<section className={styles.formCard}>
			<Text className={styles.text}>{props.text}</Text>
			<div className={styles.content}>{props.children}</div>
			<Spacer>{props.footer}</Spacer>
		</section>
	);
};
