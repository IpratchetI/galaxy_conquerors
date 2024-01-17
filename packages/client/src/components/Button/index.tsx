import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
}

export const Button = (props: IButtonProps) => {
	const { title, ...restProps } = props;
	return (
		<button className={styles.button} {...restProps}>
			{title}
		</button>
	);
};
