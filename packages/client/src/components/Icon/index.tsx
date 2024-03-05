import React, { memo } from 'react';

import { classnames } from '@/utils/classnames';

import styles from './index.module.scss';

interface IconBaseProps {
	className?: string;
	svg: string;
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
	const { className, svg, size = 24, clickable, ...otherProps } = props;

	const icon = (
		<img
			className={classnames(styles.icon, {}, [className])}
			width={size}
			height={size}
			alt=""
			src={svg}
			{...otherProps}
		/>
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
