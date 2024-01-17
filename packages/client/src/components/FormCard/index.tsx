import { PropsWithChildren, ReactElement } from 'react';

import styles from './FormCard.module.scss';

interface IFormCardProps extends PropsWithChildren {
	header: ReactElement;
	footer: ReactElement;
}

export const FormCard = (props: IFormCardProps) => {
	return (
		<section className={styles.formCard}>
			<div className={styles.header}>{props.header}</div>
			<div className={styles.content}>{props.children}</div>
			<div className={styles.footer}>{props.footer}</div>
		</section>
	);
};
