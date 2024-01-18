import { ButtonHTMLAttributes } from 'react';

import { classnames } from '@/utils/classnames';

import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
}

export const Button = (props: IButtonProps) => {
	const { title, className, ...restProps } = props;

	return (
		<button className={classnames(styles.button, {}, [className])} {...restProps}>
			{title}
		</button>
	);
};
