import { classnames } from '@/utils/classnames';

import { SpacerProps } from './types';
import styles from './index.module.scss';

export const justifyClasses = {
	start: styles.justifyStart,
	end: styles.justifyEnd,
	between: styles.justifyBetween,
	center: styles.justifyCenter,
	evenly: styles.justifyEvenly,
	around: styles.justifyAround
};

export const alignClasses = {
	start: styles.alignStart,
	end: styles.alignEnd,
	center: styles.alignCenter
};

export const directionClasses = {
	row: styles.directionRow,
	column: styles.directionColumn
};

export const wrapClasses = {
	wrap: styles.wrap,
	nowrap: styles.nowrap
};

export const gapClasses = {
	2: styles.gap2,
	4: styles.gap4,
	6: styles.gap6,
	8: styles.gap8,
	12: styles.gap12,
	16: styles.gap16,
	20: styles.gap20,
	26: styles.gap26,
	28: styles.gap28,
	30: styles.gap30,
	35: styles.gap35,
	40: styles.gap40,
	50: styles.gap50,
	80: styles.gap80
};

export const spaceTopClasses = {
	2: styles.spaceTop2,
	4: styles.spaceTop4,
	6: styles.spaceTop6,
	8: styles.spaceTop8,
	12: styles.spaceTop12,
	16: styles.spaceTop16,
	20: styles.spaceTop20,
	26: styles.spaceTop26,
	28: styles.spaceTop28,
	30: styles.spaceTop30,
	35: styles.spaceTop35,
	40: styles.spaceTop40,
	50: styles.spaceTop50,
	80: styles.spaceTop80
};

export const spaceBottomClasses = {
	2: styles.spaceBottom2,
	4: styles.spaceBottom4,
	6: styles.spaceBottom6,
	8: styles.spaceBottom8,
	12: styles.spaceBottom12,
	16: styles.spaceBottom16,
	20: styles.spaceBottom20,
	26: styles.spaceBottom26,
	28: styles.spaceBottom28,
	30: styles.spaceBottom30,
	35: styles.spaceBottom35,
	40: styles.spaceBottom40,
	50: styles.spaceBottom50,
	80: styles.spaceBottom80
};

export const spaceRightClasses = {
	2: styles.spaceRight2,
	4: styles.spaceRight4,
	6: styles.spaceRight6,
	8: styles.spaceRight8,
	12: styles.spaceRight12,
	16: styles.spaceRight16,
	20: styles.spaceRight20,
	26: styles.spaceRight26,
	28: styles.spaceRight28,
	30: styles.spaceRight30,
	35: styles.spaceRight35,
	40: styles.spaceRight40,
	50: styles.spaceRight50,
	80: styles.spaceRight80
};

export const spaceLeftClasses = {
	2: styles.spaceLeft2,
	4: styles.spaceLeftLeft4,
	6: styles.spaceLeft6,
	8: styles.spaceLeft8,
	12: styles.spaceLeft12,
	16: styles.spaceLeft16,
	20: styles.spaceLeft20,
	26: styles.spaceLeftLeft26,
	28: styles.spaceLeft28,
	30: styles.spaceLeft30,
	35: styles.spaceLeft35,
	40: styles.spaceLeft40,
	50: styles.spaceLeft50,
	80: styles.spaceLeft80
};

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
