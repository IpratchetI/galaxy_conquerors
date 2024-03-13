import React, { memo } from 'react';

import { classnames } from '@/utils/classnames';

import styles from './index.module.scss';

interface IconBaseProps {
	children: React.ReactNode;
	className?: string;
	size?: number;
}

interface NonClickableIconProps extends IconBaseProps {
	clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
	clickable: true;
	onClick: VoidFunction;
}

type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon = memo((props: IconProps) => {
	const { children, className, size = 24, clickable, ...otherProps } = props;

	const icon = (
		<div className={classnames(styles.icon, {}, [className])} {...otherProps}>
			{children}
		</div>
	);

	if (clickable) {
		return (
			<button
				className={styles.button}
				type="button"
				style={{ height: size, width: size }}
				onClick={props.onClick}>
				{icon}
			</button>
		);
	}

	return icon;
});
