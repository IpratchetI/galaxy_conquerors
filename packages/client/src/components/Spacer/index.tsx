import { classnames } from '@/utils/classnames';

import { SpacerProps } from './types';
import {
	alignClasses,
	directionClasses,
	gapClasses,
	justifyClasses,
	spaceBottomClasses,
	spaceLeftClasses,
	spaceRightClasses,
	spaceTopClasses,
	wrapClasses
} from './contants';
import styles from './index.module.scss';

export const Spacer = (props: SpacerProps) => {
	const {
		className,
		children,
		justify = 'center',
		align = 'center',
		direction = 'row',
		gap,
		spaceTop,
		spaceBottom,
		spaceLeft,
		spaceRight,
		wrap = 'nowrap',
		fullHeight,
		fullWidth,
		...otherProps
	} = props;

	const classes = [
		className,
		justifyClasses[justify],
		alignClasses[align],
		directionClasses[direction],
		gap && gapClasses[gap],
		spaceTop && spaceTopClasses[spaceTop],
		spaceBottom && spaceBottomClasses[spaceBottom],
		spaceTop && spaceTopClasses[spaceTop],
		spaceTop && spaceTopClasses[spaceTop],
		spaceLeft && spaceLeftClasses[spaceLeft],
		spaceRight && spaceRightClasses[spaceRight],
		wrapClasses[wrap]
	];

	const mods = {
		[styles.fullHeight]: fullHeight,
		[styles.fullWidth]: fullWidth
	};

	return (
		<div className={classnames(styles.flex, mods, classes)} {...otherProps}>
			{children}
		</div>
	);
};
