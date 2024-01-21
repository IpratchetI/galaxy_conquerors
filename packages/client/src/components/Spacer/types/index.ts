import { ReactNode } from 'react';

type FlexJustify = 'center' | 'start' | 'end' | 'between' | 'evenly' | 'around';
type FlexAlign = 'center' | 'start' | 'end';
type FlexDirection = 'row' | 'column';
type FlexWrap = 'wrap' | 'nowrap';
type FlexSpaceVariants =
	| '2'
	| '4'
	| '6'
	| '8'
	| '12'
	| '16'
	| '20'
	| '26'
	| '28'
	| '30'
	| '35'
	| '40'
	| '50'
	| '80';

export type SpacerProps = {
	className?: string;
	children: ReactNode;
	justify?: FlexJustify;
	align?: FlexAlign;
	direction?: FlexDirection;
	gap?: FlexSpaceVariants;
	spaceTop?: FlexSpaceVariants;
	spaceBottom?: FlexSpaceVariants;
	spaceRight?: FlexSpaceVariants;
	spaceLeft?: FlexSpaceVariants;
	wrap?: FlexWrap;
	fullHeight?: boolean;
	fullWidth?: boolean;
};
