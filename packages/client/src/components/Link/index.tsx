import React, { ForwardedRef, forwardRef, HTMLAttributes, Ref } from 'react';
import styles from './index.module.scss';

type Props = {
	path?: string;
} & HTMLAttributes<HTMLDivElement>;

export const Link = forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement | null>) => {
	const { path, children } = props;

	// TODO: заменить div на компонент Link из react-router-dom после подключения роутера, пока кидает ошибку
	return (
		<div {...props} ref={ref as Ref<HTMLDivElement>} className={styles.link}>
			{children}
		</div>
	);
});
